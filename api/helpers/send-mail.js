const nodemailer = require('nodemailer');
var nodemailerSendgrid = require('nodemailer-sendgrid');
const hbs = require('nodemailer-express-handlebars');

module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {
    options: {
      type: 'ref',
      required: true,
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: sails.config.sendGridAPIkey || process.env.SENDGRID_API_KEY,
      })
    );
    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.hbs',
          partialsDir: './views/email/',
          layoutsDir: './views/email/',
          defaultLayout: '',
        },
        viewPath: './views/email/',
        extName: '.hbs',
      })
    );
    try {
      let emailOptions = {
        from: 'Cinsio <alert@cinsiosailsapi.com>',
        ...inputs.options,
      };
      await transporter.sendMail(emailOptions);
    } catch (error) {
      sails.log(error);
    }
  },
};

