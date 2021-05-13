
module.exports = {

  testMessage: (db, io, data, debugOn, updating) => {

    if (debugOn) { console.log('testMessage', data) }

    const res = {
      source: data.source,
      date: new Date().toISOString(),
      message: data.message
    }
    db.collection('socketTest').insertOne(res, (err) => {
      if (err) throw err
      io.emit('testMessage', res)
    })
  }

}
