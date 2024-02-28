const userServices = require("../../services/userServices");

module.exports = {

    list: async (req, res) => {
    const users = await userServices.getAllUser();
    res.json({
      meta: {
        status: 201,
        url: req.originalUrl,
        total: users.length
      },
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        rank: user.rank,
        detail: `http://localhost:3011/api/users/${user.id}`
      })),
    })},

    userDetail: async (req, res) => {
      const user = await userServices.getUserId(req.params.id);
      res.json({
        meta: {
          status: 201,
          id: req.params.id,
        },
        data: user,
      })
    },
};