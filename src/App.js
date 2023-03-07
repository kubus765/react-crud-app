import './App.css';
import Form from './components/Form';
import Contacts from './components/Contacts';
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/*
const data = [ {
  "id": 1,
  "name": "Water",
  "surname": "Fire",
  "email": "waterfire@mail.com",
  "password": "waterfirWeFire@#@as2312",
  "phone": "123123123",
  "category": "asdasdasdasd",
  "dateOfBirth": "1999-09-09"
}]
*/

// This code defines a functional React component called App, 
// which renders a div element with the class name "App" and includes another component called Contacts. 
// This component is exported as the default export of the file.
function App() {

    // This code retrieves contact data from an API endpoint and sets up the state variable data to hold the retrieved data. 
    // It also ensures that the getData function is called when the component mounts to retrieve the data and display it on the page.
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])
    

  const getData = () => {
      axios.get('https://localhost:7275/api/Contact')
          .then((result) => {
              setData(result.data)
          })
          .catch((error) => {
              console.log(error)
          })
  }

/*

    // This code sends a PUT request to an API endpoint to update a contact's information, using the axios library. 
    // It displays a success message using the toast library if the request succeeds, or an error message if it fails.
  const handleUpdate = () => {
    const url = `https://localhost:7275/api/Contact/${editID}`;
    const data = {
        "id": editID,
        "name": editName,
        "surname": editSurname,
        "email": editEmail,
        "password": editPassword,
        "phone": editPhone,
        "category": editCategory,
        "dateOfBirth": editDateOfBirth
    }
    axios.put(url, data)
        .then(() => {
            getData();
            if(!isFormValid({name:editName,surname:editSurname,email:editEmail,password:editPassword,phone:editPhone,category:editCategory,dateOfBirth:editDateOfBirth})) return;
            toast.success("Contact has been updated.");
            handleClose();
        }).catch((error) => {
            toast.error(error);
        })
        
}

  

    // This code handles the editing of a contact 
    // by retrieving its information from the API endpoint and updating the state variables 
    // used to populate the input fields in the modal dialog.

  const handleEdit = (id) => {
    handleShow();
    axios.get(`https://localhost:7275/api/Contact/${id}`)
        .then((result) => {
            setEditId(result.data.id);
            setEditName(result.data.name);
            setEditSurname(result.data.surname);
            setEditEmail(result.data.email);
            setEditPassword(result.data.password);
            setEditCategory(result.data.category);
            setEditPhone(result.data.phone);
            setEditDateOfBirth(result.data.dateOfBirth);
        })
        .catch((error) => {
            console.log(error)
        })
}

const clear = () => {
  setName('');
  setSurname('');
  setEmail('');
  setPassword('');
  setPhone('');
  setCategory('');
  setDateOfBirth('');
}

*/

    // This code sends a POST request to add a new contact
    // updates the contact list and clears input fields 
    // after a successful response displays a toast message.
  

const handleSave = ({name,surname,email,password,phone,category,dateOfBirth}) => {
  const url = 'https://localhost:7275/api/Contact';
  const data = {
      "name": name,
      "surname": surname,
      "email": email,
      "password": password,
      "phone": phone,
      "category": category,
      "dateOfBirth": dateOfBirth
  }
  //if(!isFormValid({name,surname,email,password,phone,category,dateOfBirth})) return;
  axios.post(url, data)
      .then(() => {
         //clear();
          toast.success("Contact has been added.");
          getData();
      }).catch((error) => {
          toast.error(error);
      })
}


    // This code sends a DELETE request to remove a contact with the given ID,
    // displays a confirmation dialog before deleting
    // updates the contact list and displays a toast message after a successful response.


const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this contact?") == true) {
    axios.delete(`https://localhost:7275/api/Contact/${id}`)
        .then((result) => {
            if (result.status === 200) {
                toast.success("Contact has been removed.");
                getData();
            }
        })
        .catch((error) => {
            toast.error(error);
        })
}
}


  return (
    <div className="App">
      <Form handleSave={handleSave}/>
      <br/><br/>
     <Contacts 
        data={data} 
        handleDelete={handleDelete} 
        />
    </div>
  );
}

export default App;