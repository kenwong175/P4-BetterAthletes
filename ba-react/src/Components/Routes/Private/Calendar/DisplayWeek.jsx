import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

function DisplayWeek({ week, workouts, relative }) {
    console.log(workouts)
    return (
        <Row>
            {workouts ?
                <>
                    {week.map(day => (
                        <>
                            <Col key={day} className={`border overflow-auto cal-day`}>
                                <span className={`${(day.format('dd') === "Su" || day.format('dd') === "Sa") && 'text-danger'}`}>{day.format("Do")}</span>
                                {workouts.map((x, i) => (
                                    <>
                                        {day.format('YYYY-MM-DD') === x.workout_date &&
                                            <NavLink to={`/betterathletes/view_workout/${x.workout_id}`} className="red-shadow">

                                                <div key={i} id={x.workout_id} className="ml-3 display-6">{x.workout_name}</div>
                                            </NavLink>
                                        }
                                    </>
                                ))}
                                <div className={`${relative === "prev" ? "cal-gradient-prev" : ""} ${relative === "next" ? "cal-gradient-next" : ""}`}></div>
                            </Col>
                        </>
                    ))}
                </> :
                <div>
                    Loading ...
            </div>}
        </Row>
    )
}

export default DisplayWeek
