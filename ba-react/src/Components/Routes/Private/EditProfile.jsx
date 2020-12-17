import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { axiosInstance } from '../../../func/axiosApi';

function EditProfile({ getProfile, id, edit, setEdit, profile }) {
    const [clubErr, setClubErr] = useState(false);
    const [userprofile, setUserProfile] = useState(profile.profile)
    const [club, setClub] = useState();
    const [locError, setLocError] = useState();
    const [fnError, setFnError] = useState();
    const [lnError, setLnError] = useState();

    useEffect(() => {

        // getting club details for user creation
        async function getClub() {
            try {
                let resp = await axiosInstance.get("clubs");
                setClub(resp.data);
            } catch (error) {
                setClubErr(true)
            }
        }
        getClub();
    }, [])


    function changeHandler(e) {
        if (e.target.name === "location") {
            if (e.target.value === "") {
                setLocError("Location cannot be empty")
            } else {
                setLocError();
            }
        }
        if (e.target.name === "first_name") {
            if (e.target.value === "") {
                setFnError("First name cannot be empty")
            } else {
                setFnError();
            }
        }
        if (e.target.name === "last_name") {
            if (e.target.value === "") {
                setLnError("Last name cannot be empty")
            } else {
                setLnError();
            }
        }
        setUserProfile((user) => ({ ...user, [e.target.name]: e.target.value }));
    }

    async function submit() {
        if (userprofile.location === "") {
            setLocError("Please input your location before saving");
        }
        if (userprofile.first_name === "") {
            setFnError("Please input your first name before saving");
        }
        if (userprofile.last_name === "") {
            setLnError("Please input your last name before saving");
        }
        if (userprofile.location === "" || userprofile.first_name === "" || userprofile.last_name === "") {
            return;
        }
        try {
            await axiosInstance.put(`profile/${id}`, userprofile);
            setEdit(!edit);
            getProfile();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {clubErr && <div className="text-danger text-left">Error fetching club data!</div>}
            <Form>
                <h1 className="mb-3 display-4">{profile.profile.name.trim() ? profile.profile.name : profile.profile.username}</h1>
                <Row>
                    <Col>
                        <Form.Row className="mb-3">
                            <Form.Label>Edit First Name</Form.Label>
                            <Form.Control
                                onChange={changeHandler}
                                name="first_name"
                                type="text"
                                value={userprofile.first_name}
                            />
                            {fnError && <div className="text-danger">{fnError}</div>}
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Edit Last Name</Form.Label>
                            <Form.Control
                                onChange={changeHandler}
                                name="last_name"
                                type="text"
                                value={userprofile.last_name}
                            />
                            {lnError && <div className="text-danger">{lnError}</div>}
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Edit Club</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={changeHandler}
                                name="club">
                                {club && club.map(el => (
                                    el.club_name === userprofile.club ?
                                        <>
                                            <option key={`key${el.id}`} value={el.id}>{el.club_name}</option>
                                        </> : ""
                                ))}
                                {club && club.map(el => (
                                    el.club_name !== userprofile.club ?
                                        <>
                                            <option key={`key${el.id}`} value={el.id}>{el.club_name}</option>
                                        </> : ""
                                ))}
                            </Form.Control>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Edit Gender</Form.Label>
                            <Form.Control onChange={changeHandler} name="gender" as="select">
                                <option value={userprofile.gender}>{userprofile.gender === 'M' ? "Male" : userprofile.gender === "F" ? "Female" : "Prefer Not To Say"}</option>
                                {userprofile.gender !== 'M' && <option value="M">Male</option>}
                                {userprofile.gender !== 'F' && <option value="F">Female</option>}
                                {userprofile.gender !== 'P' && <option value="P">Prefer not to say</option>}
                            </Form.Control>
                        </Form.Row>
                        <Form.Row className="mb-3">
                            <Form.Label>Edit Date of Birth</Form.Label>
                            <Form.Control
                                onChange={changeHandler}
                                name="dob"
                                type="date"
                                value={userprofile.dob}
                            />
                        </Form.Row>
                        <Form.Row className="mb-3">
                            <Form.Label>Edit Location</Form.Label>
                            <Form.Control
                                onChange={changeHandler}
                                name="location"
                                type="text"
                                value={userprofile.location}
                            />
                            {locError && <div className="text-danger">{locError}</div>}
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Do you want to make your Workout Public?</Form.Label>
                            <Form.Control onChange={changeHandler} name="public_workouts" as="select">
                                <option value={userprofile.public_workouts}>{userprofile.public_workouts === true ? "Yes" : "No"}</option>
                                {userprofile.public_workouts === true ? <option value={false}>No</option> : <option value={true}>Yes</option>}
                            </Form.Control>
                        </Form.Row>
                    </Col>
                    <Col>
                        Photo
                </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Button onClick={submit}>
                        Save Profile
                </Button>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Button onClick={() => { setEdit(!edit) }}>
                        Back
                </Button>
                </Row>
            </Form>
        </div>
    )
}

export default EditProfile
