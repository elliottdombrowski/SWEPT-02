const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.create({
        username: 'test',
        email: 'test@test.com',
        password: 'test1234',
    });

    await User.create({
        username: 'sadie',
        email: 'sadie@sadie.com',
        password: 'sadie1234',
    });

    console.log('dummy users seeded');

    process.exit();

}
);