import React, { useState } from "react";
import { Component } from "react";
import CryptoJS from 'crypto-js/';
import $ from 'jquery';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./UserPage.css";

//For the Oauth Library
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')

class UserPage extends Component {
    constructor(props) {
        super(props);

        //If invalid token or blank page location redirect to lgin screen
        if (window.location.pathname == "/login/") {
            window.location = '/'
        }

        this.state = {
            nickname: "",
            firstname: "",
            newnickname: "",
            newfirstname: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.changeNickName = this.changeNickName.bind(this);
    }

    componentDidMount(event) {

        //Runs the get request to retrieve users information (Nick Name, first name)
        const oauth = OAuth({
            consumer: {
                key: '8fb7ec71f8b4e1f2ec28d2f8c3f7785a',
                secret: 'af035f0f340e090d5b51870f9a168acd',
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
            },
        })

        const request_data = {
            url: 'https://api-qa.goopter.com/api/rest/v7/customerinfo',
            method: 'GET',
        }

        //Parses token from url
        let token_key = window.location.pathname.substring(1, 33)
        let token_secret = window.location.pathname.substring(34)

        const token = {
            key: token_key,
            secret: token_secret,
        }

        $.ajax({
            url: request_data.url,
            type: request_data.method,
            headers: oauth.toHeader(oauth.authorize(request_data, token)),
            error: function(data){
                //If invalid token alert user and redirect to login
                alert("Invalid Token, Redirecting");
                setTimeout(function () { window.location = "/login/" }, 1000);
                return;
            },
            success: function (data) {

                //If invalid token alert user and redirect to login
                if (data.RC != 200) {
                    alert("Invalid Token, Redirecting");
                    setTimeout(function () { window.location = "/login/" }, 1000);
                    return;
                }

                this.setState({
                    nickname: data.records.nick_name.toString(),
                    firstname: data.records.first_name.toString()
                })
            }.bind(this)
        })

    }


    changeNickName(event) {

        event.preventDefault();

        //Null Check for firleds
        if (this.state.newfirstname == "" || this.state.newnickname == "") {
            alert("Fields cannot be blank")
            return;
        }

        const oauth = OAuth({
            consumer: {
                key: '8fb7ec71f8b4e1f2ec28d2f8c3f7785a',
                secret: 'af035f0f340e090d5b51870f9a168acd',
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
            },
        })

        const request_data = {
            url: 'https://api-qa.goopter.com/api/rest/v7/customerinfo',
            method: 'POST',
        }

        let token_key = window.location.pathname.substring(1, 33)
        let token_secret = window.location.pathname.substring(34)

        const token = {
            key: token_key,
            secret: token_secret,
        }

        let updated_data = {
            "first_name": this.state.newfirstname,
            "nick_name": this.state.newnickname
        }

        $.ajax({
            url: request_data.url,
            type: request_data.method,
            data: JSON.stringify(updated_data),
            contentType: "application/json",
            headers: oauth.toHeader(oauth.authorize(request_data, token)),
            error: function(data){
                alert("Invalid Token, Redirecting");
                setTimeout(function () { window.location = "/login/" }, 1000);
                return;
            },
            success: function (data) {
                let dataParsed = JSON.parse(data)
                //Refresh page after successful post request
                window.location.reload();
            }.bind(this)
        })

    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div class="container center_div">
                <b>User Page<br></br></b>
                <b>
                Nick Name : {this.state.nickname}
                <br></br>
                First Name : {this.state.firstname}
                </b>
                <form onSubmit={this.changeNickName}>
                    <FormGroup controlId="newnickname" bsSize="large">
                        <label>New Nick Name</label>
                        <FormControl
                            autoFocus
                            type="text"
                            name="newnickname"
                            value={this.state.newnickname}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="newfirstname" bsSize="large">
                        New First Name
                        <FormControl
                                name="newfirstname"
                                value={this.state.newfirstname}
                                onChange={this.handleChange}
                                type="text"
                            />
                    </FormGroup>
                    <Button block bsSize="large" type="submit">
                        Submit Form
                </Button>
                </form>
            </div>
        )
    }

}

export default UserPage;
