import React from 'react'
import { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { Container } from "react-bootstrap"
import InnerNaviBar from '../../InnerNaviBar';
import AddWorkOut from "./AddWorkOut"
import ViewWorkOut from "./ViewWorkOut"



function BetterAthletes() {
    return (
        <Fragment>
            <InnerNaviBar/>
            <Container className="border mt-5">
                <Router>
                <Switch>
                    <Route exact path="/betterathletes/add_new_workout">
                        <AddWorkOut/>
                    </Route>
                    <Route exact path="/betterathletes/view_workout">
                        <ViewWorkOut />
                    </Route>
                </Switch>
                </Router>
            </Container>
        </Fragment>
    )
}

export default BetterAthletes
