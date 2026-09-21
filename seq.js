const sequelize = require("./util/db");
const User = require("./models/users.js");
const notes = require("./models/notes.js");
const categories = require("./models/categories.js");
const bcrypt = require("bcryptjs");

User.hasMany(notes, {
    foreignKey: 'userId'
});

notes.belongsTo(User, {
    foreignKey: 'userId'
});

notes.belongsTo(categories, {
    foreignKey: 'category_id'
});

categories.hasMany(notes, {
    foreignKey: 'category_id'
});

sequelize
    .sync({ alter : true })

    .then(async () => {

        const hashedPassword1 = await bcrypt.hash("Benny209", 10);
        const hashedPassword2 = await bcrypt.hash("ck123", 10);
        const hashedPassword3 = await bcrypt.hash("ss5678", 10);

        return User.bulkCreate([
            {
                name: "Benson Boone",
                email: "bbe@gmail.com",
                password: hashedPassword1
            },
            {
                name: "Calvin Klein",
                email: "ck@gmail.com",
                password: hashedPassword2
            },
            {
                name: "Skylar Strey",
                email: "ssk@gmail.com",
                password: hashedPassword3
            }
        ]);
    })

    .then(users => {
        console.log("Users created:", users);

        return categories.bulkCreate([
            { name: "Home" },
            { name: "School" },
            { name: "Work" }
        ]);
    })

    .then(categories => {
        console.log("Categories created:", categories);

        return notes.bulkCreate([
            {
                text: "Study Chinese",
                date: "2026-09-16 09:42:34",
                userId: 1,
                category_id: 2
            },
            {
                text: "Make Breakfast",
                date: "2026-09-16 10:42:34",
                userId: 2,
                category_id: 1
            },
            {
                text: "Reply to emails",
                date: "2026-09-16 11:40:34",
                userId: 1,
                category_id: 3
            }
        ]);
    })

    .then(notes => {
        console.log("Notes created:", notes);
    })

    .catch(err => {
        console.log(err);
    });