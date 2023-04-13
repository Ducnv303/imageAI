
const Replicate = require('replicate');
require('dotenv').config();

module.exports = {


  friendlyName: 'ImageAi',

  description: 'image to image',

  inputs: {
    textInputs: {
      type: 'string',
      required: true,
    },
    initImage: {
      type: 'string',
      required: true,
    },
    captioningModel: {
      type: 'string',
      require: false,
      default: 'blip'
    },
    structuralImageStrength: {
      type: 'number',
      require: false,
      default: 0.15
    },
    conceptualImageStrength: {
      type: 'number',
      require: false,
      default: 0.4
    },
    seed: {
      type: 'number',
      require: false
    }
  },


  exits: {
    success: {
      description: ' successfull',
    },
  },


  fn: async function (inputs, exits) {
    const { default: fetch } = await import('node-fetch');
    const replicate = new Replicate({
      auth: "bad447f0a9d55e6cb3c84edc9af6b3dcfca15c8d",
      fetch: fetch
    });
    const input = {
      prompt: inputs.textInputs,
      init_image: inputs.initImage,
      captioning_model: inputs.captioningModel,
      structural_image_strength: inputs.structuralImageStrength,
      conceptual_image_strength: inputs.conceptualImageStrength,
      seed: inputs.seed
    };
    const model = "vivalapanda/conceptual-image-to-image:d0742988ca2894860b9f19cb18eeaaa446c6812f700296520fc823330503d861";
    try {
      let prediction = await replicate.run(model, { input });
      console.log(prediction);
      exits.success({ message: 'ok' });
    } catch (error) {
      console.log(error);
    }
  }
};