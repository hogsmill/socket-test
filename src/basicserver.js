const fs = require('fs')

const options = {
  key: fs.readFileSync('/etc/ssl/private/agilesimulations.co.uk.key'),
  cert: fs.readFileSync('/etc/ssl/certs/07DDA10F5A5AB75BD9E9508BC490D32C.cer')
}

const https = require('https').createServer(options)

const io = require('socket.io')(https, {
  cors: {
    origins: ['http://localhost:*', 'https://agilesimulations.co.uk'],
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log(`A user connected with socket id ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User with socket id ${socket.id} has disconnected.`)
  })
})

const port = 3016

https.listen(port, () => {
  console.log('Listening on *:' + port)
})
