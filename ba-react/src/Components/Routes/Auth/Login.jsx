import { NavLink, Redirect } from "react-router-dom";
import { Col, Form, Container, Button, Row } from "react-bootstrap";
import React, { useState } from 'react';
import { axiosInstance } from "../../../func/axiosApi"
import jwt_decode from 'jwt-decode';

function Login({ isAuth, setAuth }) {
  const [user, setUser] = useState({});
  const [loginErr, setLoginErr] = useState(false)
  function handleChange(e) {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let resp = await axiosInstance.post("login", { username: user.username, password: user.password });
      if (resp) {
        axiosInstance.defaults.headers['Authorization'] = "JWT " + resp.data.access;
        localStorage.setItem("token", resp.data.access);
        let decoded = jwt_decode(resp.data.access);
        return setAuth({
          valid: true,
          refreshed: false,
          coach: decoded.is_coach,
          user: decoded.username
        });
      }
    } catch (error) {
      setLoginErr(true)
    }
  }

  if (isAuth.valid) {
    return <Redirect to="betterathletes/dashboard" />
  }

  return (
    <div className="full-height landing">
      <Container>
        <Row className="justify-content-center align-items-center page-center">
          <Col md={6} className="bg-contrast p-4 ">
            <div className="text-center my-1">
              <h3 className="title red-shadow">Better Athletes</h3>
              <div className="red-shadow">User Login</div>
            </div>
            <Form onSubmit={handleSubmit}>
              {loginErr &&
                <Form.Label className="text-danger h6">Username or password incorrect</Form.Label>
              }
              {/* Username Input */}
              <Form.Row className="my-3 px-4">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="username"
                />
              </Form.Row>
              {/* Password Input */}
              <Form.Row className="my-3 px-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="password"
                  type="password"
                />
              </Form.Row>
              {/* Login button */}
              <Form.Row className="my-4 px-4">
                <Button variant="main" type="submit" block>
                  Login
              </Button>
              </Form.Row>
            </Form>
            <div className="text-right px-4">Don't have an account?<NavLink to="/register"> Sign up</NavLink></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login
