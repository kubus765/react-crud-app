import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const LoginForm = ({ onLoginStatusChange }) => { // updated prop name and removed unused setIsLoggedIn
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Check if user is already logged in on component mount
  useEffect(() => {
    checkIfLoginNoToast().then((isLoggedIn) => {
      onLoginStatusChange(isLoggedIn);
    });
  }, [onLoginStatusChange]); // added onLoginStatusChange to dependency array to prevent stale closures

  // Check if user is logged in by verifying their token
  const checkIfLogin = async () => {
    const token = document.cookie;
    if (token) {
      const check = `https://localhost:7275/api/Login/verify_token/${token}`;
      try {
        const response = await axios.get(check);
        const result = response.data;
        if (result) {
          toast.success("User logged in.");
          return true;
        } else {
          toast.error("User not logged in.");
          return false;
        }
      } catch (error) {
        toast.error(error);
        return false;
      }
    }
    return false;
  };
  const checkIfLoginNoToast = async () => {
    const token = document.cookie;
    if (token) {
      const check = `https://localhost:7275/api/Login/verify_token/${token}`;
      try {
        const response = await axios.get(check);
        const result = response.data;
        if (result) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  };

  // Handle form submission
  const handleSendLogin = async () => { // removed destructuring of parameters
    const token = `https://localhost:7275/api/Login/login/${username}/${password}`;
    const data = {
      username: username,
      password: password,
    };
    try {
      const result = await axios.get(token, data);
      document.cookie = result["data"];
      const isLoggedIn = await checkIfLogin();
      onLoginStatusChange(isLoggedIn);
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
      <Container>
        <Row>
          <Col>
            &nbsp;
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
              input type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col>
            <button
              className="btn btn-primary"
              onClick={handleSendLogin}
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