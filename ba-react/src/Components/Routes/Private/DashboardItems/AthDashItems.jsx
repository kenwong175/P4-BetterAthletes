import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function AthDashItems({ data, empty, card }) {

    return (
        <>
            {data.length ?
                <>
                    <Col>
                        <Row>
                            <Col><h6>Workout</h6></Col>
                            <Col><h6>Date</h6></Col>
                            <Col></Col>
                        </Row>
                        {card === 'recent_completed' &&
                            <span className="text-danger">*<span className="small">Pending coach review</span></span>
                        }
                    </Col>
                    {data.map(el => (
                        <Col key={el.result_id}>
                            <Row>
                                <Col className="">
                                    <NavLink className="h6 nav-link" to={`view_workout/${el.result_id}`}>
                                        {el.workout_name}
                                    </NavLink>
                                </Col>
                                <Col className="">
                                    <div className="pt-2">{el.workout_date}</div>
                                </Col>
                                <Col className="text-center ">
                                    <NavLink className="btn btn-main btn-sm mt-1" to={`view_workout/${el.workout_id}`}>View Workout</NavLink>
                                    {(card === 'recent_completed' && !el.reviewed) &&
                                        <span className="text-danger small mx-3">*</span>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    ))}
                </> :
                <Col>
                    <div className="mx-2 pt-4">{empty}</div>
                </Col>
            }
        </>
    )
}

export default AthDashItems
