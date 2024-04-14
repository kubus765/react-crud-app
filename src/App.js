import './App.css';
import Form from './components/Form';
import LoginForm from './components/LoginForm';
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import { toast, ToastContainer } from "react-toastify";
import { isFormValid } from "./helpers/Validation";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [editID, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editSurname, setEditSurname] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editDateOfBirth, setEditDateOfBirth] = useState('');

  // Function to close modal
  const handleClose = () => setShow(false);

  // Function to open modal
  const handleShow = () => setShow(true);

  // Function to handle login status change
  const handleLoginStatusChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  // Fetch data on component mount and whenever isLoggedIn changes
  useEffect(() => {
    getData();
  }); 

  // Function to fetch contact data from API
  const getData = () => {
    axios.get('https://localhost:7275/api/Contact')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Function to handle saving a new contact
  const handleSave = ({ name, surname, email, password, phone, category, dateOfBirth }) => {
    if (!isLoggedIn) {
      toast.error("Please login to add a new contact.");
      return;
    } else {
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
      if (!isFormValid({ name, surname, email, password, phone, category, dateOfBirth })) return;
      axios.post(url, data)
        .then(() => {
          toast.success("Contact has been added.");
          getData(); // Fetch the updated contact list
        }).catch((error) => {
          toast.error(error);
        })
    }
  }

  // Function to handle deleting a contact
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?") === true) {
      axios.delete(`https://localhost:7275/api/Contact/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Contact has been removed.");
            getData(); // Fetch the updated contact list
          }
        })
        .catch((error) => {
          toast.error(error);
        })
    }
  }

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("Logged out.");
    document.cookie = "0000000000";
  }

  // Function to handle editing a contact
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
        setEditDateOfBirth(result.data.dateOfBirth.split('T')[0]);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Function to handle updating a contact
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
    if (!isFormValid({ name: editName, surname: editSurname, email: editEmail, password: editPassword, phone: editPhone, category: editCategory, dateOfBirth: editDateOfBirth })) return;
    axios.put(url, data)
      .then(() => {
        getData();
        toast.success("Contact has been updated.");
        handleClose();
      }).catch((error) => {
        toast.error(error);
      })

  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <Form handleSave={handleSave} /><br />
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginForm onLoginStatusChange={handleLoginStatusChange} setIsLoggedIn={setIsLoggedIn} />
      )}<br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>E-mail</th>
            <th>Password</th>
            <th>Category</th>
            <th>Phone</th>
            <th>Date of birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.category}</td>
              <td>{item.phone.slice(0, 3)}-{item.phone.slice(3, 6)}-{item.phone.slice(6)}</td>
              <td>{item.dateOfBirth.split('T')[0]}</td>
              <td>
                {isLoggedIn ?
                  <div>
                    <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className="btn btn-primary" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                  :
                  <p>Please log in to make changes.</p>
                }
              </td>
            </tr>
          )) :
          <tr>
            <td colSpan={9}>Loading...</td>
          </tr>}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col><input type="text" className="form-control" placeholder="Enter Name"
              value={editName} onChange={(e) => setEditName(e.target.value)} /></Col>
          </Row>&nbsp;
          <Row>
            <Col><input type="text" className="form-control" placeholder="Enter Surname"
              value={editSurname} onChange={(e) => setEditSurname(e.target.value)}
            /></Col>
          </Row>&nbsp;
          <Row>
            <Col><input type="text" className="form-control" placeholder="Enter e-mail"
              value={editEmail} onChange={(e) => setEditEmail(e.target.value)}
            /></Col>
          </Row>&nbsp;
          <Row>
            <Col><input type="text" className="form-control" placeholder="Enter password"
              value={editPassword} onChange={(e) => setEditPassword(e.target.value)}
            /></Col>
          </Row>&nbsp;
          <Row>
            <Col><input type="text" className="form-control" placeholder="Enter category"
              value={editCategory} onChange={(e) => setEditCategory(e.target.value)}
            /></Col>
          </Row>&nbsp;
          <Row>
            <Col><input type="text" className="form-control" placeholder="Enter phone number"
              value={editPhone} onChange={(e) => setEditPhone(e.target.value)}
            /></Col>
          </Row>&nbsp;
          <Row>
            <Col><input type="date" className="form-control" placeholder="Enter date of birth"
              value={editDateOfBirth} onChange={(e) => setEditDateOfBirth(e.target.value)}
            /></Col></Row>&nbsp;
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default App;
