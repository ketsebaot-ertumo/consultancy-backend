const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        "user": process.env.USER_1,
        "pass": process.env.PASS_1
    },

});



exports.sendConfirmation = async (email, confirmationCode, firstName, lastName) => {
    const mailOptions = {
        from: '"Monarch Group" <process.env.USER_1>',
        to: email,
        subject: 'Email Account Confirmation',
        text: `Hey ${firstName} ${lastName},\n\n\nThank you for signing up with Monarch Group! Please use the confirmation code below to confirm your email address and activate your account.
            \n\nConfirmation Code: ${confirmationCode}. \n\n\nIf you did not sign up for an account, please contact us immediately. Note that this code will expire after ten minutes.\n\nBest regards,\nMonarch Group`,
        html: `<p>Hey ${firstName} ${lastName},<br><br><br>
            Thank you for signing up with Monarch Group! Please use the confirmation code below to confirm your email address and activate your account.<br><br>
            <strong>Confirmation Code:</strong> ${confirmationCode}<br><br>
            If you did not sign up for an account, please contact us immediately. Note that this code will expire after ten minutes.<br><br><br>
            Best regards,<br>
            Monarch Group</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent:', info.response);
        return info; 
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error; 
    } 

};


exports.sendWelcomeEmail = async (email, firstName, lastName) => {
    const mailOptions = {
        from: '"Monarch Group" <process.env.USER_1>',
        to: email,
        subject: 'Welcome to Monarch Group!',
        text: `Hey ${firstName} ${lastName},\n\n\nThank you for signing up with Monarch Group! We're excited to have you onboard.\n\n
        Please confirm your email address to complete the registration process.\n\nIf you didn't sign up for this account, 
        please contact us immediately.\n\n\nBest regards,\nMonarch Group`,
        html: `<p>Hey ${firstName} ${lastName},<br><br><br>
            Thank you for signing up with Monarch Group! We're excited to have you onboard.<br><br>
            Please confirm your email address to complete the registration process.<br><br>
            If you didn't sign up for this account, please contact us immediately.<br><br><br>
            Best regards,<br>
            Monarch Group</p>`,
    };

    await transporter.sendMail(mailOptions);
};


exports.sendPasswordReset = async (email, resetCode, firstName, lastName) => {
    const mailOptions = {
        from: '"Monarch Group" <process.env.USER_1>',
        to: email,
        subject: 'Password Reset',
        text: `Hey ${firstName} ${lastName},\n\nWe received a request to reset your password. Please find your password reset code below. Note that this code will expire after ten minutes.\n\n
            Password Reset Code: ${resetCode}\n\nIf you did not request a password reset, please ignore this email.\n\nThanks,\nMonarch Group`,
        html: `<p>Hey ${firstName} ${lastName},<br><br>
            We received a request to reset your password. Please find your password reset code below. Note that this code will expire after ten minutes.<br><br>
            &emsp;&emsp;&emsp;&emsp;&emsp;<strong>Password Reset Code:</strong><br>
            &emsp;&emsp;&emsp;&emsp;&emsp;<span style="font-size: 32px; font-weight: bold;">${resetCode}</span><br><br>
            If you did not request a password reset, please ignore this email.<br><br>
            Thanks,<br>
            Monarch Group</p>`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent:', info.response);
        return info; 
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error; 
    }
};


exports.sendConfReset = async (email, firstName, lastName) => {
    const mailOptions = {
        from: '"Monarch Group" <process.env.USER_1>',
        to: email,
        subject: 'Your Password Has Been Successfully Reset',
        text: `Hey ${firstName} ${lastName},\n\nYour password has been successfully reset. You can now log in using your new password.\n\n
            If you did not request this change, please contact our support team immediately.\n\n
            Thank you for being a part of Monarch Group.\n\nBest regards,\nMonarch Group`,
        html:`<p>Hey ${firstName} ${lastName},<br><br>
            Your password has been successfully reset. You can now log in using your new password.<br><br>
            If you did not request this change, please contact our support team immediately.<br><br>
            Thank you for being a part of Monarch Group.<br><br>
            Best regards,<br>
            Monarch Group</p>`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset confimation email sent:', info.response);
        return info; 
    } catch (error) {
        console.error('Error sending confirmation email for password reset:', error);
        throw error; 
    }
};


exports.sendConfirmation = async (email, code, firstName, lastName, smsBody) => {
    const mailOptions = {
        from: '"Monarch Group" <process.env.USER_1>',
        to: email,
        subject: 'Account Confirmation',
        text: `Hey ${firstName} ${lastName},<br><br>${smsBody}<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Verification code:<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span style="font-size: 32px;">
        <b>${code}</b></span>.<br><br>Thanks,<br>Monarch Group`,
        html: `Hey ${firstName} ${lastName},<br><br>${smsBody}<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Verification code:<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span style="font-size: 32px;">
        <b>${code}</b></span>.<br><br>Thanks,<br>Monarch Group`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('code confirmation email sent:', code, info.response);
        return info; 
    } catch (error) {
        console.error('Error sending code confirmation email:', error);
        throw error; 
    } 
};


exports.sendContactForm = async (receiver_email, firstName, lastName, email, message) => {
    const mailOptions = {
        from: '"Monarch mobile app" <process.env.USER_1>',
        to: receiver_email,
        subject: 'New Contact Form Submission', // Subject of the email
        text: `You have received a new contact form submission. Below are the details:\n\n
            Name: ${firstName} ${lastName}\n
            Email: ${email}\n
            Message: ${message}\n\n
            Please respond to the query as needed.`,
        html: `<p>You have received a new contact form submission. Below are the details:</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p>Please respond to the query as needed.</p>`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('email sent.', info.response);
        return info; 
    } catch (error) {
        console.error('Error sending email!', error);
        throw error; 
    }
};