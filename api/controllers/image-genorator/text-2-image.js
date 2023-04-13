
const Replicate = require('replicate')


module.exports = {


  friendlyName: 'ImageAi',


  description: 'text to image',


  inputs: {
    textInputs: {
      type: 'string',
      required: false,
    },

  },


  exits: {
    success: {
      description: ' successful',
    },
  },


  fn: async function (inputs,exits) {
    const { default: fetch } = await import('node-fetch');
    const replicate = new Replicate({
      auth: '45a11726d0a3e5d889abe82e698f6e32364d902f',
      fetch: fetch
    });
    const input = { prompt: inputs.textInputs };
    const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
    try {
      let prediction = await replicate.run(model, {input});
      console.log(prediction);
      exits.success({message: 'ok'});
    } catch (error) {

      console.log(error);

    }
  }


};
