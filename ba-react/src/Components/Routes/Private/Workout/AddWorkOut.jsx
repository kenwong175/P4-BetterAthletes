import React, { useState, useEffect } from 'react'
import DatePicker from 'react-modern-calendar-datepicker';
import { Col, Row, Form, Button, DropdownButton, Dropdown, Container } from "react-bootstrap";
import axios from "axios";

function WorkOut() {
    const [athletes, setAthletes] = useState([])
    const [date, setDate] = useState(null)
    const [inputForm, setForm] = useState(
        {
            athletes: [],
            workout_name: "",
            sets: [
                [
                    {
                        exercise: "",
                        reps: "",
                        rests: "",
                        targets: ""
                    }
                ]
            ]
        })

    function AddSet(i, item = [{
        exercise: "",
        reps: "",
        rests: "",
        targets: ""
    }]) {
        let temp = { ...inputForm }
        temp.sets.splice(i, 0, item)

        setForm(temp)
    }

    function RemoveSet(i) {
        let obj = { ...inputForm };
        obj.sets.splice(i, 1)
        setForm(obj)
    }

    function AddInput(i, ii) {
        let temp = { ...inputForm }
        temp.sets[i].splice(ii, 0, {
            exercise: "",
            reps: "",
            rests: "",
            targets: ""
        })
        setForm(temp)
    }

    function RemoveInput(i, ii) {
        let temp = { ...inputForm };
        temp.sets[i].splice(ii, 1);
        setForm(temp)
    }

    function ChangeHandler(e, i, ii) {
        let { name, value } = e.target;
        let temp = { ...inputForm };
        if (name === "athletes") {
            temp.athletes.push(value)
        } else if (name === "workout_name") {
            temp.workout_name = value
        } else if (name !== "athletes") {
            temp.sets[i][ii][name] = value
        }

        setForm(temp)
    }

    // =========================== TO UPDATE AXIOS ONCE API ROUTES FINALISED ================================\\
    /**
     * @POST = send data from INPUT FORM STATE TO DJANGO DB
     * @reminder = to check data format, convert obj to array to send to back using another set state for submitworkout func
     */
    async function submitWorkout() {
        let maxLength = 0;
        inputForm.sets.forEach(set => {
            if (set.length > maxLength) maxLength = set.length
        })
        console.log(maxLength)
        let djangoFormVersion = {
            athletes: inputForm.athletes,
            workout_name: inputForm.workout_name,
            workout_date: date,
            exercises: [],
            reps: [],
            rests: [],
            targets: [],
        }

        inputForm.sets.forEach(set => {
            let exerciseSet = []
            let repSet = []
            let restSet = []
            let targetsSet = []
            set.forEach(ex => {
                exerciseSet.push(ex.exercise)
                repSet.push(ex.reps)
                restSet.push(ex.rest)
                targetsSet.push(ex.targets)
            })
            if (exerciseSet.length < maxLength) {
                for (let i = 0; i <= maxLength - exerciseSet.length; i++) {
                    exerciseSet.push("")
                    repSet.push("")
                    restSet.push("")
                    targetsSet.push("")
                }
            }
            djangoFormVersion.exercises.push(exerciseSet)
            djangoFormVersion.reps.push(repSet)
            djangoFormVersion.rests.push(restSet)
            djangoFormVersion.targets.push(targetsSet)
        })
    }

    /**
     * @GET = retrieve Athlete data and populate in drop down list
     */

    async function getAthletes() {
        try {
            let response = await axios.get(process.env.REACT_APP_LOCALHOST + `/`);
            setAthletes(response.data) // response.data? or smtg less, check it later
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        // getAthletes();
        async function getData() {
            try {
                let response = await axios.get("http://localhost:8000/api/workouts", {
                    headers: {
                        'Authorization': "JWT " + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                        'accept': "application/json"
                    }
                });
            } catch (error) {
                return error
            }
        }
        getData();
    }, [])

    return (
        <Container className="p-5">
            <Row className="mb-3">
                <Col>
                    <h4>New Workout</h4>
                </Col>
            </Row>
            <Row className="my-3">
                <Col md={12} className="outer_form">
                    <Form>
                        <Row className="no-gutters">
                            <Col md={6} className="mr-4">
                                <Form.Control
                                    name="workout_name"
                                    onChange={(e) => ChangeHandler(e)}
                                    placeholder="Workout Name"
                                />
                            </Col>
                            <Col className="text-center">
                                <DatePicker
                                    value={date}
                                    onChange={setDate}
                                    inputPlaceholder="Workout Day"
                                    shouldHighlightWeekends
                                />
                            </Col>
                            <Col>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    variant="info"
                                    title="Athletes"
                                    className="d-flex justify-content-end"
                                    onChange={(e) => ChangeHandler(e)}
                                >
                                    <Dropdown.Item >
                                        <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Select One" name="athletes" value={1} />
                                        </Form.Group>
                                    </Dropdown.Item>
                                    {athletes.map((item, index) => (
                                        <Dropdown.Item key={index} >
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label={item} value={item} />
                                            </Form.Group>
                                        </Dropdown.Item>
                                    ))}

                                </DropdownButton>
                            </Col>
                        </Row>
                        {/* ------------------- EACH SET ------------------- */}
                        {inputForm.sets.map((item, index) => (
                            <>
                                <hr />
                                <Form.Group className="my-5 form_set" key={index}>
                                    <Row className="no-gutters">
                                        <Col md="auto">
                                            <h4>SET {index + 1}</h4>
                                        </Col>
                                        <Col md="auto" className="ml-5">{inputForm.sets.length !== 1 &&
                                            <Button className="px-3" size='sm'
                                                onClick={() => RemoveSet(index)}
                                                variant="outline-danger"> Remove Set </Button>}
                                        </Col>
                                    </Row>
                                    {/* ------------------- EACH EXERCISE LINE ------------------- */}
                                    {item.map((item2, index2) => (
                                        <Row key={index2} className="my-2">
                                            <Col md="auto">
                                                {index2 + 1}:
                                            </Col>
                                            <Col md={4} >
                                                <Form.Control
                                                    name="exercise"
                                                    onChange={(e) => ChangeHandler(e, index, index2)}
                                                    value={item2.exercise}
                                                    placeholder="Exercise type" />
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                    name="reps"
                                                    onChange={(e) => ChangeHandler(e, index, index2)}
                                                    value={item2.reps}
                                                    placeholder="Reps" />
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                    name="rests"
                                                    onChange={(e) => ChangeHandler(e, index, index2)}
                                                    value={item2.rests}
                                                    placeholder="Rest" />
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                    name="targets"
                                                    onChange={(e) => ChangeHandler(e, index, index2)}
                                                    value={item2.targets}
                                                    placeholder="Target" />
                                            </Col>
                                            {/* ------------------- Add and Remove Exercise Line Button ------------------- */}
                                            <Col md={2}>
                                                <Row>
                                                    <Col>{inputForm.sets[index].length !== 1 &&
                                                        <Button key={index} block className="mr10"
                                                            onClick={() => RemoveInput(index, index2)}
                                                            variant="outline-danger"> - </Button>}
                                                    </Col>
                                                    <Col>
                                                        <Button
                                                            key={index} block
                                                            onClick={() => AddInput(index, index2)}
                                                            variant="outline-secondary"> + </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    ))}
                                    {/* ------------------- Add and Repeat Set Button ------------------- */}
                                    <Row className="my-4">
                                        <Col md={3} className="ml-auto">
                                            <Button block size='sm'
                                                onClick={() => AddSet(index)}
                                                variant="outline-secondary"> Add Set </Button>
                                        </Col>
                                        <Col md={3}>
                                            <Button block size='sm'
                                                onClick={() => AddSet(index, item)}
                                                variant="secondary"> Repeat Set </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </>
                        ))}
                    </Form>

                    <Row >
                        <Col md={12} className="d-flex flex-row-reverse">
                            <Button
                                variant="warning"
                                type="submit"
                                onClick={submitWorkout}
                            >Save Exercise</Button>
                        </Col>
                    </Row>
                </Col>


            </Row>
        </Container>
    )
}

export default WorkOut
