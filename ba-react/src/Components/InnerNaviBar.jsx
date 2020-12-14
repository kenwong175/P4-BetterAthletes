import React, { Fragment } from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, Button, Form, Nav } from "react-bootstrap";


function InnerNaviBar() {
    let user = localStorage.getItem("user");

    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/betterathletes">BETTER ATHLETES</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/betterathletes/Club" className="border-right px-3">
                                Club(Athlete List)
                        </Nav.Link>
                        <Nav.Link href="/betterathletes/view_workout" className="border-right px-3">
                                Workouts 
                        </Nav.Link>
                        <Nav.Link href="/Rankings" className="px-3">
                                Rankings
                        </Nav.Link>
                    </Nav>
                <Form inline>
                    Logged in as: 
                    <div className="px-1">
                        <NavLink to="/profile_settings" style={{ textDecoration: 'none' }} className="text-secondary">
                            <Button variant="outline-info">
                                {user}
                            </Button> 
                        </NavLink>
                    </div>
                    <div className="px-1">
                        <NavLink to="/logout" style={{ textDecoration: 'none' }} className="alert">
                            <Button variant="outline-secondary">
                                Logout
                            </Button>
                        </NavLink>
                    </div>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}

export default InnerNaviBar
