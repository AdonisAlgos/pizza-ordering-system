import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import client from './Client';
import '../App.css';
import Button from '@mui/material/Button';




const ADD_USER = gql`
mutation InsertAppointmentProject($username: String, $password: String, $user: String) {
  insert_appointment_project(objects: {username: $username, password: $password, user: $user}) {
    affected_rows
    returning {
      username
			password
      user
    }
  }
}
`;

export default function Register(){

  const [password, setPassword] = useState("");
  const [visible] = useState(false);

  const [addUserMutation, { loading, error }] = useMutation(ADD_USER, { client });

  const addUserToDatabase = async (username, password, user) => {
    try {
      const result = await addUserMutation({
        variables: {
          username: username,
          password: password,
          user: user,
        },
      });
      console.log('User added successfully');
      alert("User added successfully!");
      goBack();
      return result;
    } catch (error) {
      console.error('Error adding user:', error);
      alert("Username awready exist");
      
    }
  };

  let navigate = useNavigate();

  function goBack() {
    let path = `/`; 
    navigate(path);
    
  }

  

  function register(){
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    

    if(username === '' && password === ''){
      alert("please enter username and password");
    }
    else if(username ===''){
      alert("please enter username");
    }
    else if(password ===''){
      alert("please enter password");
    }
    else if(selectedRadioButton === null){
      alert("please select User Account type");
    }
    else{
      addUserToDatabase(username, password, selectedRadioButton);
      document.getElementById("username").value = "";
      
      setPassword('');
      
    }

  };

  
    const [selectedRadioButton, setselectedRadioButton] = useState(null);
  
    const handleRadioChange = (event) => {
      setselectedRadioButton(event.target.value);
    };
  

    return(
      
      
      
      <div >
        <header className="App-header">Register</header>
        <TextField className="App-username" label="username" id="username" placeholder="username"   username/>
        <TextField className="App-password" label="password" id="password" placeholder="password" 
        value={password} onChange={e => setPassword(e.target.value)} type={visible ? "text" : "password"} password/>

        

      
        <Button className="Register-createAccButton" variant="contained" onClick={register}>Sign up</Button>
        <Button className="Register-backButton" variant="contained" onClick={goBack}>Back</Button>

        <label style={{ marginLeft: '110px'}}>
        <input
          type="radio"
          name="options"
          value="Employee"
          checked={selectedRadioButton === 'Employee'}
          onChange={handleRadioChange}
        />
        Employee
      </label >

      <label  style={{ marginRight: '10px'}}>
        <input
          type="radio"
          name="options"
          value="Client"
          checked={selectedRadioButton === 'Client'}
          onChange={handleRadioChange}
        />
        Client
      </label>
      </div>
      
    
  
  );

       
    
}