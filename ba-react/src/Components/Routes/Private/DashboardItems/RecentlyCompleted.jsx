import React from 'react'
import { Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function RecentlyCompleted({ data }) {
    return (
        <>
            {data.length ?
                <>
                    {data.map(el=>(
                        <Col key={el.result_id}>
                            <NavLink className="nav-link" to="">
                                {el.athlete_name} - {el.workout_name}
                            </NavLink>
                        </Col>
                    ))}
                </>:
                <>No workout records</>
            }
        </>
    )
}

export default RecentlyCompleted
