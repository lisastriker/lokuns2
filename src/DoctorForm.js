import { Typography, FormGroup, InputLabel as InputLabel1, Input as Input1, Button as Button1} from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import firebase from '@firebase/app';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { EmailRounded } from '@material-ui/icons';
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig"

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}
const Type = styled(Typography)`
  text-align:left;
  word-wrap: break-word;
  font-size:0.8em;
`

const Button = styled(Button1)`
  width:80%;
  background-color:#1B203C;
  border-radius:10px;
  color:white;
  :hover{
    background-color:grey;
  }
`
const InputLabel = styled(InputLabel1)`
  color:black;
  font-family: roboto;
  font-size: 1.5em;
  font-weight: 400;
  width: 100%;
  text-align:center;
  margin-top:10px;
  margin-bottom:40px;
`


const Input = styled(Input1)`
  padding-left:10px;  
  background:white;
  width:100%;
  border:solid black 0.5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin-bottom:10px;
  border-radius:5px;
`

const MainContainer = styled.div`
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

`
const Container = styled.div`
  border-radius:10px;
  background-color:#fafafa;
  display:flex;
  justify-content: center;
  align-items: center;
  
`

const FormGroupStyled = styled(FormGroup)`
  padding: 20px;
  border: 2px solid black;
  max-width:100%;
`

function DoctorForm(props) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [medical, setMedical] = useState("")
  const [finalNumberValue, setFinalNumberValue] = useState("")
  //Get userUID
  
  var userUID = localStorage.getItem('useruid') ? localStorage.getItem('useruid') : ""  
  // console.log(userUID)
  var db = firebase.firestore()
  if(userUID){
    db.collection("users").doc(userUID).get().then((doc)=>{
      if (doc.exists) {
        setName(doc.data().name)
        setAddress(doc.data().address)
        setEmail(doc.data().email)
        setMedical(doc.data().medical)
        // console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
    //Very interesting using setFInalNumberValue for the input field to be changed!
  }
  

    return <MainContainer ><Container><FormGroupStyled>
    <InputLabel htmlFor="my-input">Doctor User Profile</InputLabel>  
    <Input required={true} disabled={true}  placeholder="Name" id="my-input" aria-describedby="my-helper-text"  value={name}/>
    <Input required={true} disabled={true} placeholder="Address" id="my-input" aria-describedby="my-helper-text"  value={address}/>
    <Input required={true} disabled={true} placeholder="Email" id="my-input" aria-describedby="my-helper-text"  value={email}></Input>  
    <Input required={true} disabled={true} placeholder="Medical License Number" id="my-input" aria-describedby="my-helper-text" value={medical}/>
    <Input defaultValue={props.finalNumber} onChange={event => setFinalNumberValue(event.target.value)} ></Input>
    <Button type="submit" label="submit" onClick={() => openInNewTab(`http://wa.me/${finalNumberValue}`)}>Submit</Button>
    </FormGroupStyled>
    </Container>
    </MainContainer>;
  
}

export default DoctorForm