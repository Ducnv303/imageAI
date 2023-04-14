
const fs = require('fs')
const request = require('request')


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


    friendlyName: 'dowloadImage',


    description: 'dowload image',


    inputs: {
        uri: {
            type: 'string',
            required: true,
        },
        filename: {
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

        const download = function (uri, filename, callback) {
            request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };

        try {
            download(inputs.uri, inputs.filename, function () {
                exits.success({ message: 'ok' });
                
            });
            console.log(download);
        } catch (error) {
            console.log(error);
        }

    }




};
