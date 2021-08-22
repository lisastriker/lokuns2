import { Typography, Button } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { firebaseConfig } from "./firebaseConfig"
import firebase from '@firebase/app';
import { useEffect, useState } from "react";
import styled, { isStyledComponent } from 'styled-components'
var db = firebase.firestore()
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}

const CardStyled = styled(Card)`
  width:50%;
  text-align:left
`
function ClinicLanding(){
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [medical, setMedical] = useState("")

  const [clinicEmail, setClinicEmail] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [JobId, setJobId] = useState("")
  const [Date, setDate] = useState("")

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
        <Typography variant="body2" component="p">
        Requested date of Booking: {Date}
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
      <input type="text" id="timepicker-input" placeholder="00:00" />
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </CardStyled>
  </div>
  )
}

export default ClinicLanding