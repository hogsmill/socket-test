
module.exports = {

  testMessage: function(db, io, data, debugOn, updating) {

    if (debugOn) { console.log('testMessage', data) }

    const res = {
      source: data.source,
      date: new Date().toISOString(),
      message: data.message
    }
    global.updating = true
    setTimeout(function() {
      db.collection('socketTest').insertOne(res, function(err) {
        if (err) throw err
        io.emit('testMessage', res)
        global.updating = false
      })
    }, 10000)
  }

}
