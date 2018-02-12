// process.on('message', (msg) => {
//   console.log('Message from parent:', msg);
// });

// let counter = 0;

// setInterval(() => {
//   process.send({ counter: counter++ });
// }, 1000);

// for when sending to library
// setInterval(() => {
//   process.send({ counter: counter++ });
// }, 180000);

// module.exports = {
  requestVideoLibrary = (info) => {
    router.get('/requestVideoLibrary', async (ctx) => {
      try {
        console.log('get request maybe sent?')
        ctx.request = {'search': info.search, 'region': info.region };
        ctx.status = 201;
      } catch (err) {
       console.log('searchInfo error handler:', err.message);
     }
    });
  }
// }
// module.exports = { requestVideoLibrary };
