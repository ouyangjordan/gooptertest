import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login() {

    //Save state of email and password
    const [email, setEmail] = useState("7788758095@c.goopter.com");
    const [password, setPassword] = useState("20200506");

    function handleSubmit(event) {

        event.preventDefault();

        //Handles the submit of the login information
        let loginInfo = {
            "data": {
                "email": email,
                "password": password
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo)
        };

        fetch('https://api-qa.goopter.com/api/rest/v8/login', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    //If the result is not 200 alert user to try again
                    if (result.RC != 200) {
                        alert("Invalid Login")
                        return
                    }

                    //Redirect page to user screen upon successful login
                    window.location = '/' + result.records.token + '+' + result.records.secret
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <div className="Login center_div">
            <form onSubmit={handleSubmit}>
                <b>Login Page</b>
                <FormGroup controlId="email" bsSize="large">
                    <label>Email</label>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    Password
                <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}