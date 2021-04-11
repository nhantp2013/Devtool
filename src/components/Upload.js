import React, { Component, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { Link, Route } from 'react-router-dom';
import { Button, Form, FormGroup, Label, FormText, Input } from "reactstrap";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';
import ResponsiveDrawer from './drawer';
import "./upload.css";
import axios from 'axios'
import { IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

class Upload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            confirmation: "",
            isLoading: "",
            files: "",
            FullName: "",
            NationID: "",
            DOB: "",
            Addresss: "",
            DateFrom: "",
            DateTo: "",
            status: "Available",

            snackbaropen: false,
            snackbarmsg: ''
        }

        this.changeHandler = this.changeHandler.bind(this);
    }


    
    // handleChange(event) {
    //     event.preventDefault();
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     this.setState({ name: value });

    // }


    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    async handleSubmit(event) {
        event.preventDefaulr();
        this.setState({ confirmation: "Uploading..." });
        // Fetch api

    }

    async getFiles(files) {
        this.setState({
            isLoading: "Extracting data",
            files: files
        });

        const UID = Math.round(1 + Math.random() * (1000000 - 1));

        var date = {
            fileExt: "png",
            imageID: UID,
            folder: UID,
            img: this.state.files[0].base64
        };

        this.setState({ confirmation: "Processing..." })
        await fetch(
            'https://qdv4v6sn30.execute-api.us-west-1.amazonaws.com/Production/',
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application.json"
                },
                body: JSON.stringify(date)
            }
        );

        let targetImage = UID + ".png";
        const response = await fetch(
            'https://l1wrc4x5al.execute-api.us-east-1.amazonaws.com/Product/OCR',
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application.json"
                },
                body: JSON.stringify(targetImage)
            }
        );


        this.setState({ confirmation: "" })
        // this.setState({ status: "Check-out" })

        const OCRBody = await response.json();
        console.log("OCRBody", OCRBody);

        this.setState({ NationID: OCRBody.body[0] })
        this.setState({ FullName: OCRBody.body[1] })
        this.setState({ DOB: OCRBody.body[2] })
        this.setState({ Addresss: OCRBody.body[3] })
        this.setState({ files: " " });
        this.setState({ status: "Check-out" })
    }

    submitHandler = e => {
        e.preventDefault();
       
        this.setState({ status: "Check-out" })
        axios
            .put('http://localhost:1337/double-rooms/6065c661b835b962307c558a', this.state)
            .then(response => {
                this.setState({ snackbaropen: true, snackbarmsg: 'Add Success !' })
                this.setState({ status: "Check-out" })
            })
            .catch(e => {
                console.log(e)
                this.setState({ snackbaropen: true, snackbarmsg: 'Opp something wrong !' })
            })
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

  

    render() {
        const processing = this.state.confirmation;

        return (

            <div className="row" style={{ marginTop: 10 }}>

                <Snackbar  open={this.state.snackbaropen}>
                    <MuiAlert vertical= 'top' onClose={this.snackbarClose} severity="success" elevation={6} autoHideDuration={1000}>
                        {this.state.snackbarmsg}
                </MuiAlert>
                </Snackbar>

                <div className="col-6 offset-3">
                    <Form
                        // onSubmit={this.handleSubmit} 
                        onSubmit={this.submitHandler}
                    >
                        <FormGroup>
                            <h3 className="text-danger">{processing}</h3>
                            <h6>Upload National ID</h6>
                            <FormText color="muted">PNG,JPG</FormText>


                            <div className="form-group files color" id="showImg">
                                <FileBase64
                                    multiple={true}
                                    onDone={this.getFiles.bind(this)}></FileBase64>

                            </div>
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <h6>Customer Name</h6>
                            </Label>
                            <Input
                                type="text"
                                name="FullName"
                                id="FullName"
                                required
                                value={this.state.FullName}

                                onChange={this.changeHandler}

                            />

                        </FormGroup>


                        <FormGroup>
                            <Label>
                                <h6>National ID</h6>
                            </Label>
                            <Input
                                type="text"
                                name="NationID"
                                id="NationID"
                                required
                                value={this.state.NationID}
                                onChange={this.changeHandler}
                            />
                        </FormGroup>



                        <FormGroup>
                            <Label>
                                <h6>DOB</h6>
                            </Label>
                            <Input
                                type="text"
                                name="DOB"
                                id="DOB"
                                required
                                value={this.state.DOB}
                                onChange={this.changeHandler}
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label>
                                <h6>Address</h6>
                            </Label>
                            <Input
                                type="text"
                                name="Addresss"
                                id="Addresss"
                                required
                                value={this.state.Addresss}
                                onChange={this.changeHandler}
                            />
                        </FormGroup>



                        <FormGroup>
                            <Label>
                                <h6>From:</h6>
                            </Label>
                            <Input
                                type="date"
                                name="DateFrom"
                                id="DateFrom"
                                required

                                onChange={this.changeHandler}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <h6>To:</h6>
                            </Label>
                            <Input
                                type="date"
                                name="DateTo"
                                id="DateTo"
                                required

                                onChange={this.changeHandler}
                            />
                        </FormGroup>

                        <Button type='submit' className="btn btn-lg btn-block  btn-success">
                            <DoneIcon />Submit
                        </Button>

                        <Link to='/'>
                            <Button className="btn btn-lg btn-block btn-error" style={{ marginTop: 10 }}>
                                <ArrowBackIosIcon />Back
                        </Button>

                        </Link>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Upload;
