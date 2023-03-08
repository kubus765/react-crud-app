import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const LoginForm = ({props, setIsLoggedIn}) => {

    const checkIfLogin = () => {
      const token = document.cookie;
      if (token) {
        const check = `https://localhost:7275/api/Login/verify_token/${token}`;
        console.log("test");
        return axios
          .get(check)
          .then((response) => {
            const result = response.data;
            if (result) {
              toast.success("User logged in.");
              return true;
            } else {
              toast.error("User not logged in.");
              return false;
            }
          })
          .catch((error) => {
            toast.error(error);
            return false;
          });
      }
      return Promise.resolve(false);
      
    };

    // submit form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    useEffect(() => {
        checkIfLogin().then((isLoggedIn) => {
          setIsLoggedIn(isLoggedIn);
        });
      }, []);
  
    const handleSendLogin = async ({ username, password }) => {
        const token = `https://localhost:7275/api/Login/login/${username}/${[
          password,
        ]}`;
        const data = {
          username: username,
          password: password,
        };
        try {
          const result = await axios.get(token, data);
          document.cookie = result["data"];
          const isLoggedIn = await checkIfLogin();
          props.onLoginStatusChange(isLoggedIn);
          if (!isLoggedIn) {
            toast.error("Incorrect username or password.");
          }
        } catch (error) {
          toast.error(error);
        }
      };
  
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
            <Col>
              <h2>Please log in to make changes.</h2>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <input
                style={{ minWidth: "80px", textAlign: "center" }}
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
            <Col>
              <input
                style={{ minWidth: "80px", textAlign: "center" }}
                type="text"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col>
              <button
                className="btn btn-primary"
                onClick={() => handleSendLogin({ username, password })}
              >
                Log in
              </button>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  };
  export default LoginForm;