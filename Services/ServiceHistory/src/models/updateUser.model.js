const { makePaginate } = require('sequelize-cursor-pagination');
module.exports = (sequelize, Sequelize) => {
    const updateUser = sequelize.define("updateUser", {
        userId: {
            type: Sequelize.INTEGER
        },
        history: {
            type: Sequelize.JSON
        }
    });
    updateUser.paginate = makePaginate(updateUser);
    return updateUser;
};