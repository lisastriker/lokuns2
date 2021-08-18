import { Typography, FormGroup, InputLabel as InputLabel1, Input as Input1, FormHelperText, Button as Button1} from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from '@firebase/app';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { EmailRounded } from '@material-ui/icons';
require('firebase/auth');
var firebaseui = require('firebaseui');
require('firebase/auth')

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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

`
const Container = styled.div`
  border-radius:10px;
  height: 100%;
  width: 100%;
  background-color:white;
  display:flex;
  justify-content: center;
  align-items: center;
  
`

const FormGroupStyled = styled(FormGroup)`
  padding: 50px;
  border: 2px solid black;
  max-width:50%;
`

function DoctorForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [medical, setMedical] = useState("")
  var userProfile = JSON.parse(localStorage.getItem('user'))   
  function checkUser(){
    setName(userProfile.name)
    setAddress(userProfile.address)
    setEmail(userProfile.email)
    setMedical(userProfile.medial)
    console.log(name)
  }

    return <MainContainer ><Container><FormGroupStyled>
    <InputLabel htmlFor="my-input">Doctor User Profile</InputLabel>  
    <Input required="true"  placeholder="Name" id="my-input" aria-describedby="my-helper-text" value={userProfile ? userProfile.name: ""}/>
    <Input required="true"  placeholder="Address" id="my-input" aria-describedby="my-helper-text" value={userProfile ? userProfile.address: ""}/>
    <Input required="true"  placeholder="Email" id="my-input" aria-describedby="my-helper-text" value={userProfile ? userProfile.email: ""}></Input>  
    <Input required="true"  placeholder="Medical License Number" id="my-input" aria-describedby="my-helper-text" value={userProfile ? userProfile.medical: ""}/>
    <Button type="submit" label="submit" onClick={() => checkUser()}>Submit</Button>
    </FormGroupStyled>
    </Container>
    </MainContainer>;
  
}

export default DoctorForm