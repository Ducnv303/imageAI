module.exports = {


  friendlyName: 'My account',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      description: 'ok'
    },
    badRequest: {
      statusCode: 404,
      description: 'User not found',
    },
    serverError: {
      statusCode: 500,
      description: 'serverError'
    }
  },


  fn: async function (inputs, exits, env) {
    const foundUser = await sails.models.user.findOne({ email: env.req.session.email }); // req.session.user is filled in by the isLoggedIn policy
    /* istanbul ignore if */
    if (!foundUser) {
      // this should not happen
      return exits.badRequest();
    }

    return exits.success(foundUser);
  }


};
