
require('dotenv').config();
const fs = require('fs');
const axios = require('axios')

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

    const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM3MmJiOEY0OTgzMjVmQjI2MDExREYxQjMzNjNCQTA0N2E1MmM5QzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MTM2Nzk4OTQyNiwibmFtZSI6ImltYWdlIn0.eGdK2pkAlTfgVMz58F4xC57IeW_2oGyPaYgrg2rXoZA'
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(inputs.uri);
        // here image is url/location of image
        const blob = await response.blob();
        console.log(blob);
        // const file = new File([blob]);
        // console.log(file);
        axios({
            method: "post",
            url: "https://api.nft.storage/upload",
            data: blob,
            headers: { "Content-Type": "image/*","Authorization" : `Bearer ${NFT_STORAGE_KEY}` },
          }).then(function(response){
            console.log('a');
          }) 
        exits.success({ message: 'ok'});
  }
};
