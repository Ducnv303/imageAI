
const fs = require('fs')
const request = require('request')


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
            required: false,
        },
    },

    exits: {
        success: {
            description: ' successful',
        },
    },

    fn: async function (inputs, exits) {
        const { default: fetch } = await import('node-fetch');
        fetch(inputs.uri)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'image.png';
                a.click();
                URL.revokeObjectURL(url);
                exits.success({ message: 'ok' });
            })
            
            .catch(error => {
                console.error(error);
            });

    }




};
