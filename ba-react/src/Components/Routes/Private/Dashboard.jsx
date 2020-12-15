import React from 'react'
import { Row } from 'react-bootstrap'
import AthleteDash from './DashboardItems/AthleteDash'
import CoachDash from './DashboardItems/CoachDash'

function Dashboard({ isAuth }) {

    return (
        <Row className="pt-5">
            {isAuth.coach ?
                <CoachDash /> :
                <AthleteDash />
            }
        </Row>
    )
}

export default Dashboard
