module.exports = {


  friendlyName: 'Reset password',


  description: '',


  inputs: {
    password: {
      description: 'The new, unencrypted password.',
      example: 'myfancypassword',
      required: true,
    },
    token: {
      description:
        'The password token that was in the forgot-password endpoint',
      example: 'gwa8gs8hgw9h2g9hg29',
      required: true,
    },
  },


  exits: {
    success: {
      description:
        'Password successfully updated, and requesting user agent automatically logged in',
    },
    invalidToken: {
      statusCode: 401,
      description:
        'The provided password token is invalid, expired, or has already been used.',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {

    try {
      if (!inputs.token) {
        return exits.invalidToken({
          error: 'Your reset token is either invalid or expired',
        });
      } var user = await User.findOne({ passwordResetToken: inputs.token });
      if (!user || user.passwordResetTokenExpiresAt <= Date.now()) {
        return exits.invalidToken({
          error: 'Your reset token is either invalid or expired',
        });
      }
      const hashedPassword = await sails.helpers.passwords.hashPassword(
        inputs.password
      );
      await User.updateOne({ id: user.id }).set({
        password: hashedPassword,
        passwordResetToken: '',
        passwordResetTokenExpiresAt: 0,
      });
      const token = await sails.helpers.generateNewJwtToken(user.email);
      this.req.user = user;
      return exits.success({
        message: `Password reset successful. ${user.email} has been logged in`,
        user,
        token,
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  }


};
