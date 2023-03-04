import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
// sample data 
const Contacts = () => {

    const conData = [
        {
            id: 1,
            name: "name",
            surname: "surname",
            email: "email",
            password: "password",
            category: "category",
            phone: "999-999-999",
            dateOfBirth: "20-03-1990"
        },
        {
            id: 2,
            name: "name",
            surname: "surname",
            email: "email",
            password: "password",
            category: "category",
            phone: "999-777-999",
            dateOfBirth: "22-08-1995"
        }
    ]
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(conData);
        
    }, [])
    // table acquired from react github edited to work for the data
    return (
        <Fragment>
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
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
                    }
                </tbody>
            </Table>
        </Fragment>
    )
}

export default Contacts;