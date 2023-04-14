
require('dotenv').config();

module.exports = {


  friendlyName: 'ImageAi',


  description: 'text to image',


  inputs: {
    uri: {
      type: 'string',
      required: true,
    },
 
  },


  exits: {
    success: {
      description: ' successful',
    },
  },


  fn: async function (inputs, exits) {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(inputs.uri);
        // here image is url/location of image
        const blob = await response.blob();
        console.log(blob);
        // const file = new File([blob], 'image.jpg', {type: blob.type});
        // console.log(file);
        exits.success({ message: 'ok'});
  }
};
