
const {NFTStorage, File} = require('nft.storage')
const mime = require('mime') 
const fs =require('fs') 
const path =require('path') 

module.exports = async function uploadStorage(req, res) {


    const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM3MmJiOEY0OTgzMjVmQjI2MDExREYxQjMzNjNCQTA0N2E1MmM5QzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MTM2Nzk4OTQyNiwibmFtZSI6ImltYWdlIn0.eGdK2pkAlTfgVMz58F4xC57IeW_2oGyPaYgrg2rXoZA'
    
 

    async function fileFromPath(filePath) {
        const content = await fs.promises.readFile(filePath)
        const type = mime.getType(filePath)
        return new File([content], path.basename(filePath), { type })
    }

    async function storeNFT(imagePath, name, description) {
        // load the file from disk
        const image = await fileFromPath(imagePath)
    
        // create a new NFTStorage client using our API key
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    
        // call client.store, passing in the image & metadata
        return nftstorage.store({
            image,
            name,
            description,
        })
    }


    req.file('file').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    }, async function whenDone(err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }
  
      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }
  
      // Get the base URL for our deployed application from our custom config
      // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
      sails.log("uploadedFiles[0].fd", uploadedFiles[0].fd) // file upload image
    //   return res.ok();
    if (uploadedFiles[0]) {
        console.log(uploadedFiles[0].fd);
        await storeNFT(uploadedFiles[0].fd,'hihi','hihi')

      
    }
      
    });
  
  };