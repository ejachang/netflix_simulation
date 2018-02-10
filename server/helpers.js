module.exports = {
  getDate: () => {
    var d1 = new Date();
    d1.toUTCString();
    Math.floor(d1.getTime()/ 1000)
    var d2 = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );
    d2.toUTCString()
    return d2
  }
}