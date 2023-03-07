import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CloseButton from 'react-bootstrap/CloseButton';

const Contacts = () => {
    
    // submit form 
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [category, setCategory] = useState('')
    const [phone, setPhone] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

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

    const isFormValid = () => {
        if (!name) {
            toast.error("Please input a valid name.");
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(name)) {
            toast.error("Name should contain only letters.");
            return false;
        }
        if (!surname) {
            toast.error("Please input a valid surname.");
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(surname)) {
            toast.error("Surname should contain only letters.");
            return false;
        }
        if (!email) {
            toast.error("Please input a valid email address.");
            return false;
        }
        if (!isValidEmail(email)) {
            toast.error("Invalid email address.");
            return false;
        }
        if (!password) {
            toast.error(`Please input a password before submitting.`);
            return false;
        }
        if (!validatePassword(password)) {
            toast.error(`Password has to have at least one uppercase letter, one lowercase letter, one number and one special character.`);
            return false;
        }
        if (category === '--Choose a category--') {
            toast.error("Pick a category before submitting.");
            return false;
        }
        if (!validatePhoneNumber(phone)) {
            toast.error("Phone number should have exactly 9 symbols. Digits only.");
            return false;
        }
        if (!dateOfBirth) {
            toast.error("Please select a date of birth.");
            return false;
        }

        return true;

    }

    // "Other" category logic (for displaying an input text box instead of a <select>)
    const [isOtherCategory, setIsOtherCategory] = useState(false)
    
    const __setCategory = (data) => {
        if (data === 'other') {
            setIsOtherCategory(true)
        }
        setCategory(data)
    }
    
    const resetCategory = () => {
        setIsOtherCategory(!isOtherCategory)
        setCategory('')
    }

    // This code sends a POST request to add a new contact
    // updates the contact list and clears input fields 
    // after a successful response displays a toast message.
    const handleSave = () => {
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
        if(!isFormValid()) return;
        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success("Contact has been added.");
            }).catch((error) => {
                toast.error(error);
            })
    }
    // This code resets a form's input fields by setting several state 
    // variables to empty strings or null values.
    const clear = () => {
        setName('');
        setSurname('');
        setEmail('');
        setPassword('');
        setPhone('');
        setCategory('');
        setDateOfBirth('');
    }

    return (
        <Fragment>
            <ToastContainer />
            {/* 
                This code is a form with several input fields for the user to enter contact details, 
                including name, surname, email, password, category, phone number, and date of birth. 
                The "Submit" button triggers the handleSave function when clicked.
            */}
            &nbsp;
            <Container>
                <Row>
                    <Col><input style={{"min-width": "80px", "text-align": "center" }} type="text" class="form" className="form-control" placeholder="Enter Name"
                        value={name} onChange={(e) => setName(e.target.value)} /></Col>
                    <Col><input style={{"min-width": "80px", "text-align": "center" }} type="text" className="form-control" placeholder="Enter Surname"
                        value={surname} onChange={(e) => setSurname(e.target.value)} /></Col>
                    <Col><input style={{"min-width": "200px", "text-align": "center" }} type="text" className="form-control" placeholder="Enter e-mail"
                        value={email} onChange={(e) => setEmail(e.target.value)} /></Col>
                    <Col><input style={{"min-width": "64px", "text-align": "center" }} type="text" className="form-control" placeholder="Enter password"
                        value={password} onChange={(e) => setPassword(e.target.value)} /></Col>
                </Row>&nbsp;
                <Row>
                    <Col>
                    { !isOtherCategory ?
                        <select style={{"min-width": "182px", "text-align": "center" }} className="form-control" id="cat-select" value={category} onChange={(e) => __setCategory(e.target.value)}>
                            <option value="">--Choose a category--</option>
                            <option value="business">Business</option>
                            <option value="personal">Personal</option>
                            <option value="other">Other</option>
                        </select> :
                        <span style={{display: "flex", 'align-items': "center", gap: '8px'}}>
                          <input style={{"min-width": "64px", "text-align": "center" }}type="text" className="form-control" placeholder="Enter Category" value={category} onChange={(e) => __setCategory(e.target.value)} />
                          <CloseButton onClick={() => resetCategory(!isOtherCategory)}/>
                        </span>
                    }
                    </Col>

                    <Col><input style={{"min-width": "64px", "text-align": "center" }} type="text" className="form-control" placeholder="Enter phone number"
                        value={phone} onChange={(e) => setPhone(e.target.value)} /></Col>
                    <Col><input type="date" className="form-control" placeholder="Enter date of birth"
                        value={dateOfBirth} style={{"min-width": "64px", "text-align": "center" }} onChange={(e) => setDateOfBirth(e.target.value)} /></Col>
                    <Col><button className="btn btn-primary" onClick={() => handleSave()}>Submit</button></Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Contacts;