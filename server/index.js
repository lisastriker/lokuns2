const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID
//"ACd3be63050c5ec10eec96601af4f9cb1b"
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN
// "b0bb3d17c13fb8b93b1a83dbf4378e28"
const client = require('twilio')(accountSid, authToken);
const express = require('express'); 
const cors = require('cors');
const app = express()
const path = require('path')
const port = process.send.PORT || 4000
app.use(cors())

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('build'))
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

app.get('/send-text', (req, res) => {
  const { textMessage, recipient } = req.query
  client.messages
  .create({
   body: textMessage,
   from: '+14155211196',
   to: '+6586121207'
  })
  .then(message => console.log(message.sid));
  res("Sent")
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:`, port)
})