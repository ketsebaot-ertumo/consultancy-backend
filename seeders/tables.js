const bcryptjs = require('bcryptjs');
const { sequelize, Users, Bookings, Services, Notifications, Blogs, Testimonials } = require('../models/index');
const serviceData = [
  {
    title: 'Aromatherapy',
    description: 'A calming 60-minute aromatherapy session.',
    category: 'Massage',
    price: 60.00,
    discount: 8.00,
    duration: 60,
    status: 'inactive',
    imageUrl: 'https://images.app.goo.gl/3z98FxRWdb4Unb1VA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Facial Treatment',
    description: 'A deep cleansing facial treatment for glowing skin.',
    category: 'Skincare',
    price: 40.00,
    discount: 5.00,
    duration: 45,
    status: 'active',
    imageUrl: 'https://images.app.goo.gl/gF4NQJzkyuMurvcC7',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

(async () => {
  try {
    // await sequelize.sync({ force: true }); // This will drop and recreate all tables on this db
    await Users.sync({ force: true });
    const generateHashedPassword = async () => {
      return await bcryptjs.hash('Admin123.', 10);
    };
    const password = await generateHashedPassword();
    const userData = [{ 
        firstName: 'admin', lastName: 'admin', email: 'admin@gmail.com', password: password, phone: '+251919765445', 
        isConfirmed: true, role: 'admin', createdAt: new Date(), updatedAt: new Date(), }
    ];
    await Users.bulkCreate(userData);

    const existingUser = await Users.findOne();
    if (!existingUser) {
      throw new Error('Cannot seed data, No data found.');
    }

    await Notifications.sync({ force: true });
    const notificationData=[ {
      userId: existingUser.id,
      bookingId: existingBooking.id,
      message: "Your booking has been confirmed.",
      type: "Confirmation",
      status: "sent",
      createdAt: new Date(),
      updatedAt: new Date(),
    },]
    await Notifications.bulkCreate(notificationData);

    await Blogs.sync({ force: true });
    const blogData = [
      {
        userId: existingUser.id,
        title: "The Future of AI in Web Development",
        slug: "future-ai-web-development",
        content: "Artificial Intelligence is revolutionizing web development...",
        imageUrl: "https://example.com/images/ai-web.jpg",
        status: "published",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: existingUser.id,
        title: "How to Build a Scalable SaaS Application",
        slug: "build-scalable-saas",
        content: "Scalability is a key factor in building SaaS applications...",
        imageUrl: "https://example.com/images/scalable-saas.jpg",
        status: "draft",
        publishedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    await Blogs.bulkCreate(blogData);

    console.log('Seed data added successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
})();
