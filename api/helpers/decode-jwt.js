const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Decode jwt',


  description: '',


  inputs: {
    accessToken: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {
      const secretKey = sails.config.jwtSecret || process.env.JWT_SECRET;

      const decoded = jwt.verify(inputs.accessToken, secretKey)
      return decoded;
    } catch (error) {
      throw error
    }
  }
};

