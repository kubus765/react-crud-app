import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contacts = () => {
    
    // handlers for the modal popups
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // edit form (modal)
    const [editID, setEditId] = useState('')
    const [editName, setEditName] = useState('')
    const [editSurname, setEditSurname] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editPassword, setEditPassword] = useState('')
    const [editCategory, setEditCategory] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [editDateOfBirth, setEditDateOfBirth] = useState('')

    // regex for email verification
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }
    // regex for password verification
    const validatePassword = (password) => {
        // At least one uppercase letter, one lowercase letter, one number and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        return passwordRegex.test(password);
      }
    // regex for phone number validation
      function validatePhoneNumber(phoneNumber) {
        return /^\d{9}$/.test(phoneNumber);
      }
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
                if(!isEditFormValid()) return;
                toast.success("Contact has been updated.");
                handleClose();
            }).catch((error) => {
                toast.error(error);
            })
            
    }
    const isEditFormValid = () => {
        if (!editName) {
            toast.error("Please input a valid name.");
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(editName)) {
            toast.error("Name should contain only letters.");
            return false;
        }
        if (!editSurname) {
            toast.error("Please input a valid surname.");
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(editSurname)) {
            toast.error("Surname should contain only letters.");
            return false;
        }
        if (!editEmail) {
            toast.error("Please input a valid email address.");
            return false;
        }
        if (!isValidEmail(editEmail)) {
            toast.error("Invalid email address.");
            return false;
        }
        if (!editPassword) {
            toast.error(`Please input a password before submitting.`);
            return false;
        }
        if (!validatePassword(editPassword)) {
            toast.error(`Password has to have at least one uppercase letter, one lowercase letter, one number and one special character.`);
            return false;
        }
        if (editCategory === '--Choose a category--') {
            toast.error("Pick a category before submitting.");
            return false;
        }
        if (!validatePhoneNumber(editPhone)) {
            toast.error("Phone number should have exactly 9 symbols. Digits only.");
            return false;
        }
        if (!editDateOfBirth) {
            toast.error("Please select a date of birth.");
            return false;
        }
        return true;
    }
    
    // This code resets a form's input fields by setting several state 
    // variables to empty strings or null values.

    return (
        <Fragment>
            <ToastContainer />
            {/* 
                This code creates a table that displays contact information. 
                The table has columns for ID, name, surname, email, password, category, phone, date of birth, and actions. 
                It uses data from the data state to dynamically render rows for each contact. 
                The rows also have buttons for editing and deleting contacts, which call the respective functions handleEdit and handleDelete.
            */}
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
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>
                                        <td>{item.category}</td>
                                        <td>{item.phone.slice(0,3)}-{item.phone.slice(3,6)}-{item.phone.slice(6)}</td>
                                        <td>{item.dateOfBirth.split('T')[0]}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.id)} >Edit</button> &nbsp;
                                            <button className="btn btn-primary" onClick={() => handleDelete(item.id)} >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
                    }
                </tbody>
            </Table>
            {/* 
                This is a modal component that displays a form for editing contact information. 
                It contains input fields for name, surname, email, password, category, phone number, and date of birth. 
                The modal includes "Close" and "Save Changes" buttons. When the "Save Changes" button is clicked, 
                the handleUpdate function is called to update the contact information, and the modal is closed.
            */}
            
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
                    <Button variant="primary" onClick={() => {
                        handleUpdate();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Contacts;