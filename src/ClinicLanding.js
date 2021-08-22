import { Typography, Button, TextField, InputAdornment, IconButton, withTheme } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { firebaseConfig } from "./firebaseConfig"
import firebase from '@firebase/app';
import { useEffect, useState } from "react";
import styled from 'styled-components'
import dotenv from 'dotenv'
dotenv.config('../.env');

var db = firebase.firestore()
  var axios = require('axios')
  var qs = require('qs')
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}

const CardStyled = styled(Card)`
  width:50%;
  text-align:left
`

const TextStyled = styled(TextField)`
  border:solid 2px black;
`

const ContainerForTime = styled.div`
  padding-left:20px;
  display:flex;
  flex-direction:column
`
const ButtonStyled = styled(Button)`
  background-color:#FF9F1C;
  margin-left:10px;
  &:hover {
    background-color:grey;
  }
`
function ClinicLanding(){
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [medical, setMedical] = useState("")
  const [phone, setPhone] = useState("")
  const [clinicEmail, setClinicEmail] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [JobId, setJobId] = useState("")
  const [Date, setDate] = useState("")
  const [textMessage, setTextMessage] = useState("")
  const [recipient, setRecipient] = useState("")
  let url = new URL(window.location.href);
  console.log(window.location.href)
  const uid = url.searchParams.get("uid");
  const userid = url.searchParams.get("userid");
  const date = url.searchParams.get("day")

  useEffect(()=>{
    db.collection("users").doc(userid).get().then((doc)=>{
      if (doc.exists) {
        setName(doc.data().name)
        setAddress(doc.data().address)
        setEmail(doc.data().email)
        setMedical(doc.data().medical)
        setPhone(doc.data().phone)
        // console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }}).catch((error) => {
      console.log("Error getting document:", error);
    })


    db.collection("emails").doc(uid).get().then((doc)=>{
      if (doc.exists) {
        console.log(doc.data())
        setClinicEmail(doc.data().Email)
        setEmailSubject(doc.data().Subject)
        setJobId(doc.data().JobId)
        setDate(date)
        // console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }}).catch((error) => {
      console.log("Error getting document:", error);
    })
  },[])
  
  function onSubmit(){
    setTextMessage(encodeURIComponent("Your appoint "))
    setRecipient("+6586121207")
    fetch(`http://localhost:4000/send-text?textMessage=${textMessage}`)
  }
// TWILIO_AUTH_TOKEN = "5c342dda4adeff7684a15aacea536689"
    // var client = require('twilio')("ACd3be63050c5ec10eec96601af4f9cb1b", "5c342dda4adeff7684a15aacea536689")
    // client.messages
    // .create({
    //    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //    from: '+14155211196',
    //    to: '+6586121207'
    //  })
    // .then(message => console.log(message.sid));
    // console.log(`I am sid ${accountSid}`)

  return(
    <div style={{display:"flex", flexDirection:"row"}}> 
    <CardStyled style={{width:"50%", textAlign:"left"}}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Doctor Request:
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Typography color="textSecondary" >
          {address}
        </Typography>
        <Typography  color="textSecondary">
          {email}
        </Typography>
        <Typography variant="body2" component="p">
          {medical}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </CardStyled>
    <CardStyled >
    <CardContent>
      <Typography variant="h5" component="h2">
        Clinic Acceptance: 
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {clinicEmail}
      </Typography>
      <Typography  color="textSecondary">
        {emailSubject}
      </Typography>
      <Typography variant="body2" component="p">
        JobID: {JobId}
      </Typography>
      <Typography variant="body2" component="p">
        Requested date of Booking: {Date}
      </Typography>
    </CardContent>
    <form style={{display:"flex", flexDirection:"columns", alignItems:"center"}}>
    <ContainerForTime>
      <Typography>Start Time</Typography>
      <TextStyled
        id="time"
        type="time"
        freesolo
        defaultValue="12:00"
        InputProps={{
          shrink: true, 
          disableUnderline: true 
        }}
      />
      </ContainerForTime>
      <ContainerForTime>
      <Typography>End Time</Typography>
      <TextStyled
        id="time"
        type="time"
        defaultValue="12:00"
        inputProps={{
          step: 1800, // 5 min
          disableUnderline: true 
        }}
      />
      </ContainerForTime>
    </form>
    <CardActions>
      <ButtonStyled variant="contained" color="default" size="small" onClick={()=>onSubmit()}>Submit</ButtonStyled>
    </CardActions>
  </CardStyled>
  </div>
  )
}

export default ClinicLanding