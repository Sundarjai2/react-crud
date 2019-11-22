import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const ADD_STUDENT = gql`
    mutation AddStudent(
        $name: String!,
        $course: String!,
        $rollnumber: String!,
        $address: String!,
        $gender: String!,
        $birth_year: Int!) {
        addStudent(
            name: $name,
            course: $course,
            rollnumber: $rollnumber,
            address: $address,
            gender: $gender,
            birth_year: $birth_year) {
            _id
        }
    }
`;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 240,
    },
}));

function HigherOrderComponent(props) {
    const { classes } = props;
}

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 240,
    },
})

class Create extends Component {

    state = {
        formData: {
            studentname: '',
            course: '',
            rollnumber: '',
            address: '',
            birth_year: '',
            gender:''
        },
        submitted: false,
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    render() {
        const { classes } = this.props;
        const { formData, submitted } = this.state;
        let name, course, rollnumber, address, birth_year, gender;
        return (
            <div className="container">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Add Student - Details
                    </Typography>
                    </Toolbar>
                </AppBar>
                <div className="buttonBadge"><Button variant="contained" color="default" className={"backBtn"}><Link to="/">Home</Link></Button></div>
                <Mutation mutation={ADD_STUDENT} onCompleted={() => this.props.history.push('/')}>
                    {(addStudent, { loading, error }) => (

                        <div>
                            <ValidatorForm
                                    ref="form"
                                    onSubmit={this.handleSubmit}
                                >
                                    <h2>Add Student</h2>
                                    <TextValidator
                                        label="Student Name"
                                        onChange={this.handleChange}
                                        name="studentname"
                                        value={formData.studentname}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <br />
                                    <TextValidator
                                        label="Course"
                                        onChange={this.handleChange}
                                        name="course"
                                        value={formData.course}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <br />
                                    <TextValidator
                                        label="Roll Number"
                                        onChange={this.handleChange}
                                        name="rollnumber"
                                        value={formData.rollnumber}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <br />
                                    <TextValidator
                                        label="Address"
                                        onChange={this.handleChange}
                                        name="address"
                                        value={formData.address}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <br />
                                    <TextValidator
                                        label="Birth Year"
                                        onChange={this.handleChange}
                                        name="birth_year"
                                        value={formData.birth_year}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <br />
                                    <TextValidator
                                        label="Gender"
                                        onChange={this.handleChange}
                                        name="gender"
                                        value={formData.gender}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <br />
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={submitted}
                                    >
                                        {
                                            (submitted && 'Your form is submitted!')
                                            || (!submitted && 'Submit')
                                        }
                                    </Button>
                                </ValidatorForm>
                            {/* <form className={classes.container} noValidate autoComplete="off" onSubmit={e => {
                                e.preventDefault();
                                addStudent({ variables: { name: name.value, course: course.value, rollnumber: rollnumber.value, address: address.value, gender: gender.value, birth_year: parseInt(birth_year.value) } });
                                name.value = "";
                                course.value = "";
                                rollnumber.value = "";
                                address.value = "";
                                gender.value = null;
                                birth_year.value = "";
                            }}>
                                <div>
                                    <TextField required label="Student Name" className={classes.textField} margin="normal" ref={node => {
                                        name = node;
                                    }} />
                                    <TextField required label="Course" className={classes.textField} margin="normal" ref={node => {
                                        course = node;
                                    }} />
                                    <TextField required label="Rollnumber" className={classes.textField} margin="normal" ref={node => {
                                        rollnumber = node;
                                    }} />
                                    <TextField required label="Address" className={classes.textField} margin="normal" ref={node => {
                                        address = node;
                                    }} />
                                    <TextField required label="Birth Year" className={classes.textField} margin="normal" ref={node => {
                                        birth_year = node;
                                    }} />
                                    <TextField required label="Gender" className={classes.textField} margin="normal" ref={node => {
                                        gender = node;
                                    }} />
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>

                            </form> */}
                            {/* {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again )</p>} */}
                        </div>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default withStyles(styles)(Create);