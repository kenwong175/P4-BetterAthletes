import { NavLink } from "react-router-dom";
import { Col, Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import React, {useState} from 'react';
import jwt_decode from 'jwt-decode';

function Login() {
  const [user, setUser] = useState({});

  function handleChange(e) {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      console.log(user);
      let resp = await axios.post("http://localhost:8000/api/login",{username: user.username, password: user.password});
      localStorage.setItem("token", resp.data.access);
      let token = localStorage.getItem("token");
      let decoded = jwt_decode(token);
      localStorage.setItem("user", decoded.username);
      localStorage.setItem("is_coach", decoded.is_coach);
      // setIsAuth(true);
    } catch (error) {
      console.log(error);
    }    
  }

  // Logout button that removes token
  function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_coach");
  }

  // Test function to test token and authorization. Remove when done.
  async function test(){
    try {
      console.log(user);
      let resp = await axios.get("http://localhost:8000/api/workouts",{
        headers:{
          'Authorization': "JWT " + localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'accept': 'application/json'
      }
      });
      console.log(resp)
      // setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="d-flex align-items-center">
      <Container className="text-center">
        <Col>
          <h3>Better Athletes</h3>
          <Form onSubmit={handleSubmit}>
            <div>User Login</div>
            {/* Username Input */}
            <Form.Row>
            <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="username"
                onChange={handleChange}
                name="username"
              />
            </Form.Row>
            {/* Password Input */}
            <Form.Row className="mb-3">
            <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                placeholder="password"
                name="password"
                type="password"
              />
            </Form.Row>
            {/* Login button */}
            <Form.Row className="mb-3">
              <Button type="submit" block>
                Login
              </Button>
            </Form.Row>
          </Form>
          {/* Logout button */}
          <Form.Row className="mb-3">
          <Button onClick={logout} block>
                Logout
          </Button>
          </Form.Row>
          <Button onClick={test} block>
                {/* For you to test the GET function to get workouts list */}
                Test
          </Button>
          <NavLink to="/register">Sign Up Now </NavLink>
        </Col>
      </Container>
    </div>
  );
}

export default Login
