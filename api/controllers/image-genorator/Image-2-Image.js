
const Replicate = require('replicate')


// module.exports = async function imagesss(req, res) {
//   const replicate = new Replicate({
//     auth: '45a11726d0a3e5d889abe82e698f6e32364d902f',
//   });
//   const model = "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608";
//   const input = {
//     image: "https://replicate.delivery/pbxt/IJEPmgAlL2zNBNDoRRKFegTEcxnlRhoQxlNjPHSZEy0pSIKn/gg_bridge.jpeg",
//     question: "what body of water does this bridge cross?"
//   };
//   let prediction = await replicate.run(model, { input });

//   // If no user was found, redirect to signup.
//   // if (!prediction) {
//   //   console.log(prediction);
//   // }

//   console.log(prediction);

// }




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


  fn: async function (_,exits) {
    const { default: fetch } = await import('node-fetch');
    const replicate = new Replicate({
      auth: '45a11726d0a3e5d889abe82e698f6e32364d902f',
      fetch: fetch
    });
    const input = { prompt: "an astronaut riding a horse on mars, hd, dramatic lighting, detailed" };
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
