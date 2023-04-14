


module.exports = function uploadFile(req, res) {
  req.file('file').upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000
  }, function whenDone(err, uploadedFiles) {
    if (err) {
      return res.serverError(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0) {
      return res.badRequest('No file was uploaded');
    }

    // Get the base URL for our deployed application from our custom config
    // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
    sails.log("uploadedFiles[0].fd", uploadedFiles[0].fd) // file uploade
    return res.ok();
    
  });

};