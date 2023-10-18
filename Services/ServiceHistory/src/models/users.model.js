module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return Users;
};