import React, { Fragment } from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, Col, Row, Form, Nav, Container, Button } from "react-bootstrap";

function LoggedInLanding() {
    return (
        <>
            <Container className="text-center">
                <Row>
                    <Col md={12} className="my-4">
                        <h6 className="display-1">Better Athletes</h6>
                    </Col>
                    <Col md={12} className="my-4">
                        <h6 className="display-4">Join Us Today</h6>
                    </Col>
                    <Col md={6} className="my-4">
                        <NavLink to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="outline-primary" size="lg" block>Login</Button>
                        </NavLink>
                    </Col>

                    <Col md={6} className="my-4">
                        <NavLink to="/register" style={{ textDecoration: 'none' }}>
                            <Button variant="outline-secondary" size="lg" block> Register</Button>
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoggedInLanding
