
const Replicate = require('replicate')
require('dotenv').config();

module.exports = {


  friendlyName: 'ImageAi',


  description: 'text to image',


  inputs: {
    textInputs: {
      type: 'string',
      required: true,
    },
    imageScale: {
      type: 'string',
      default: '768x768',
      required: false,
    },
    numOutputs: {
      type: 'number',
      require: false,
      default: 1
    }
  },


  exits: {
    success: {
      description: ' successful',
    },
  },


  fn: async function (inputs, exits) {
    const { default: fetch } = await import('node-fetch');
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
      fetch: fetch
    });
    const input = {
      prompt: inputs.textInputs,
      image_dimensions: inputs.imageScale,
      num_outputs: inputs.numOutputs
    };
    const model = process.env.MODEL_STABILITY;
    try {
      let prediction = await replicate.run(model, { input });
      console.log(prediction);
      exits.success({ message: 'ok' });
    } catch (error) {
      console.log(error);
    }
  }
};
