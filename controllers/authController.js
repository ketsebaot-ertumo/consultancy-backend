const { Op } = require('sequelize');
const moment = require('moment');
const { sendPasswordResetEmail, sendConfirmationEmail } = require('../utilis/sendEmail');
const { generateCode } = require('../utilis/generateCode');
const { sequelize, Users } = require('../models/index');


// capitalize names
const capitalizeName = (name) => {
  return name.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

// user sign up
exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const t = await sequelize.transaction();
  try {
      if (!firstName || !lastName || !email || !password) {
          return res.status(400).json({ success: false, message: 'All fields are required.' });
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
          return res.status(400).json({ success: false, message: 'Invalid email format.' });
      }
      const userData = {
        firstName: capitalizeName(firstName), lastName: capitalizeName(lastName), email, ...(phoneNumber ? { phoneNumber } : {}), password
      };
      const [newUser, created] = await Users.findOrCreate({
          where: { email: { [Op.iLike]: email } },
          defaults: { firstName: capitalizeName(firstName), lastName: capitalizeName(lastName), email, phoneNumber, password, userType: 'Customer'},
          transaction: t
      });
      if (!created) {
          return res.status(400).json({ success: false, message: 'Email already in use.' });
      }
      // Send email inside transaction
      const confirmationLink = `${process.env.CLIENT_URL}/confirm/${newUser.confirmationCode}`;
      await sendConfirmationEmail(newUser.email, newUser.firstName, newUser.lastName, confirmationLink);
      await t.commit();
      return res.status(201).json({ success: true, message: 'Please check your email for confirmation code to verify your email.', user: newUser });
  } catch (error) {
      await t.rollback();
      console.error('Error during signup:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
};

// verify user email
exports.confirm = async (req, res) => {
  const { email} = req.body;
  const confirmationCode = req.params.confirmationCode;
  if (!confirmationCode || !email) {
    return res.status(400).json({ success: false, message: "Please provide all required fields." });
  }
  try {
    const t = await sequelize.transaction();
    const existingUser = await Users.findOne({ 
      where: { confirmationCode, email: { [Op.iLike]: email }, isConfirmed: false },
      lock: t.LOCK.UPDATE,
      transaction: t
    });
    if (!existingUser) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'The account associated with this email has either already been confirmed or does not exist.',});
    }
    existingUser.isConfirmed = true;
    await existingUser.save({transaction: t});
    sendTokenResponse(existingUser, 200, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message, stack: error.stack });
  }
};

// //user signin
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide the required fields." });
    }
    const existingUser = await Users.findOne({ where: { email: { [Op.iLike]: email } } });
    if (!existingUser) {
        return res.status(404).json({ success: false, message: 'No account found with the provided email address.',});
    }
    if(existingUser.isConfirmed === false) {
      return res.status(400).json({ success: false, message: "This email address has not yet been confirmed. Please check your inbox for the confirmation email." });
    }
    const isMatched = await existingUser.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({ success: false, message: "Invalid credential." });
    }
    sendTokenResponse(existingUser, 200, res);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message, stack: error.stack });
  }
};

//logout
exports.logout = async (req, res, next) => {
  try{
    res.clearCookie('token');
    req.headers['authorization'] = '';
    return res.status(204).json({success: true, message: "Successfully logged out." })
  }catch(err){
    console.error(err);
    return res.status(500).json({ success: false, message: err.message, stack: err.stack });
  }
}

//user forgot password
exports.forgot = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Please provide an email." });
  }
  const t = await sequelize.transaction();
  try {
    // Generate a unique reset code
    const resetCode = generateCode();
    // Atomically update user with the reset code
    const [updated] = await Users.update(
      { resetCode },
      { where: { email: { [Op.iLike]: email } }, transaction: t }
    );
    if (updated === 0) {
      await t.rollback();
      return res.status(404).json({ success: false, message: "No account found with this email." });
    }
    const resetLink = `${process.env.CLIENT_URL}/auth/reset/${resetCode}`;
    await sendPasswordResetEmail(email, resetLink);
    await t.commit();
    return res.status(200).json({ success: true, message: "Reset code sent successfully." });
  } catch (error) {
    await t.rollback();
    console.error("Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// User Reset Password
exports.reset = async (req, res) => {
  const { email, password } = req.body;
  const resetCode = req.params.resetCode;
  if (!email || !password || !resetCode) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  const transaction = await sequelize.transaction();
  try {
    // Find the user with the reset code
    const existingUser = await Users.findOne({
      where: { email: { [Op.iLike]: email }, resetCode },
      lock: t.LOCK.UPDATE, // Ensures that no other transaction can modify this row
      transaction: t
    });
    if (!existingUser) {
      await t.rollback();
      return res.status(400).json({ success: false, message: "Invalid reset code or email address." });
    }
    // Check if reset code is expired (valid for 10 minutes)
    const resetExpirationTime = moment.utc(existingUser.updatedAt).add(10, "minutes");
    if (moment.utc().isAfter(resetExpirationTime)) {
      return res.status(410).json({ success: false, message: "Reset code expired. Please request a new one." });
    }
    // Hash the new password
    existingUser.password = await bcrypt.hash(password, 10);
    existingUser.resetCode = null;
    await existingUser.save({ transaction });
    await transaction.commit();
    return res.status(200).json({ success: true, message: "Password reset successfully. You may now log in." });
  } catch (error) {
    await transaction.rollback();
    console.error("Password reset error:", error);
    return res.status(500).json({ success: false, message: "An error occurred while resetting the password.", error: error.message });
  }
};

// generate token
const sendTokenResponse = async (user, statusCode, res) => {
    try {
        const token = await user.getJwtToken();
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only in HTTPS
            sameSite: 'Strict', 
            maxAge: 8 * 60 * 60 * 1000, // 8 hours
        };
        return res.status(statusCode)
            .cookie('token', token, cookieOptions)
            .json({
                success: true,
                data: {
                  id: user.id,
                  role: user.role,
                  token,
                }
            });
    } catch (error) {
      console.error('Error generating token:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  