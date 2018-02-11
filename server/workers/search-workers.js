// self.addEventListener('message', function(e) {
//   // Send the message back.
//   self.postMessage('You said: ' + e.data);
// }, false);

self.addEventListener('message', function(e) {  
  requestVideoLibrary = () => {
    router.get('/requestVideoLibrary', async (ctx) => {
      try {
        console.log('get request maybe sent?')
        ctx.request = {'search': 'search', 'region': 'region'};
        ctx.status = 200;
      } catch (err) {
       console.log('searchInfo error handler:', err.message);
     }
    });
  }
  self.requestVideoLibrary(e.data);
}, false);
// module.exports = { requestVideoLibrary };