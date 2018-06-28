module.exports = {
    extractListOfUsers(usersList) {
        let users = [];
        for (let i = 0; i < usersList.length; ++i) {
            let i_user = usersList[i].dataValues;
            let user = {
                memberName: i_user.fullname,
                memberEmail: i_user.email,
                accountCreatedAt: i_user.createdAt,
            };
            users.push(user);
        }
        return users;
    }
}
