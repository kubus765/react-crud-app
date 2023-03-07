import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CloseButton from 'react-bootstrap/CloseButton';
import { isFormValid } from "../helpers/Validation";

const Form = () => {
    
    // submit form 
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [category, setCategory] = useState('')
    const [phone, setPhone] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

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
        if(!isFormValid({name,surname,email,password,phone,category,dateOfBirth})) return;
        axios.post(url, data)
            .then(() => {
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

export default Form;