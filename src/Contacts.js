import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Contacts = () => {
    // handlers for the modal popups
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const[name, setName] = useState('')
    const[surname, setSurname] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[category, setCategory] = useState('')
    const[phone, setPhone] = useState('')
    const[dateOfBirth, setDateOfBirth] = useState('')
    
    const[editName, setEditName] = useState('')
    const[editSurname, setEditSurname] = useState('')
    const[editEmail, setEditEmail] = useState('')
    const[editPassword, setEditPassword] = useState('')
    const[editCategory, setEditCategory] = useState('')
    const[editPhone, setEditPhone] = useState('')
    const[editDateOfBirth, setEditDateOfBirth] = useState('')

    // sample data for the table
    const conData = [
        {
            id: 1,
            name: "name",
            surname: "surname",
            email: "email",
            password: "password",
            category: "category",
            phone: "999999999",
            dateOfBirth: "20-03-1990"
        },
        {
            id: 2,
            name: "name",
            surname: "surname",
            email: "email",
            password: "password",
            category: "category",
            phone: "999777999",
            dateOfBirth: "22-08-1995"
        }
    ]
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(conData);
    }, [])
    //handlers for Edit, Delete and Update of entries
    const handleEdit = (id) =>{
        alert(id);
        handleShow();
    }
    const handleDelete = (id) =>{
        if(window.confirm("Are you sure you want to delete this contact?") == true){
            alert(id);
        }
    }
    const handleUpdate = ()=>{

    }
    return (
        <Fragment>
            <Container>
      <Row>
        <Col><input type="text" className="form-control" placeholder="Enter Name"/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Surname"/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter e-mail"/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter password"/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter category"/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter phone number"/></Col>
        <Col><input type="date" className="form-control" placeholder="Enter date of birth"/></Col>
        <Col><button className="btn btn-primary">Submit</button></Col>
      </Row>
    </Container>
    <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
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
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>
                                        <td>{item.category}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.dateOfBirth}</td>
                                        <td colSpan = {2}>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)} >Edit</button> &nbsp;
                                            <button className="btn btn-primary" onClick={()=> handleDelete(item.id)} >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>     
        <Row>
        <Col><input type="text" className="form-control" placeholder="Enter Name"/></Col></Row><Row>
        <Col><input type="text" className="form-control" placeholder="Enter Surname"/></Col></Row><Row>
        <Col><input type="text" className="form-control" placeholder="Enter e-mail"/></Col></Row><Row>
        <Col><input type="text" className="form-control" placeholder="Enter password"/></Col></Row><Row>
        <Col><input type="text" className="form-control" placeholder="Enter category"/></Col></Row><Row>
        <Col><input type="text" className="form-control" placeholder="Enter phone number"/></Col></Row><Row>
        <Col><input type="date" className="form-control" placeholder="Enter date of birth"/></Col></Row><Row>
      </Row></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}

export default Contacts;