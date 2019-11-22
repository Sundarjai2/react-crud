import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FormLabel from '@material-ui/core/FormLabel';
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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

const GET_COURSES = gql`
    { 
        courses{
        _id
        name
        courseId 
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
    }
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
})

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedGender: "", selectCourse: "" };
    }
    handleChange = ev => {
        this.setState({ selectedGender: ev.target.value });
    };

    handleChangeCourse = event => {
        this.setState({ selectCourse: event.target.value });
    };

    render() {
        const { classes } = this.props;
        let name, course, rollnumber, address, birth_year, gender;
        const { selectedGender, selectCourse } = this.state;
        return (
            <div className="container">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Add Student - Details
                    </Typography>
                    </Toolbar>
                </AppBar>
                <div className="buttonBadge"><Button variant="contained" color="default" href="/" className={"backBtn"} >Home</Button></div>
                <Mutation mutation={ADD_STUDENT} onCompleted={() => this.props.history.push('/')}>
                    {(addStudent, { loading, error }) => (
                        <div>
                            <form onSubmit={e => {
                                e.preventDefault();
                                addStudent({ variables: { name: this.name.value, rollnumber: this.rollnumber.value, course: selectCourse, address: this.address.value, gender: selectedGender, birth_year: parseInt(this.birth_year.value) } });
                                this.name.value = "";
                                this.rollnumber.value = "";
                                this.selectCourse = "";
                                this.address.value = "";
                                this.selectedGender = "";
                                this.birth_year.value = "";
                            }}>

                                <TextField required label="Rollnumber" type="number" className={classes.textField} margin="normal" inputRef={el => this.rollnumber = el} /><br />
                                <TextField required label="Student Name" className={classes.textField} margin="normal" inputRef={el => this.name = el} /><br />


                                <FormControl required className={classes.formControl}>
                                    <InputLabel htmlFor="course-native-required">Course</InputLabel>


                                    <Query pollInterval={500} query={GET_COURSES}>
                                        {({ loading, error, data }) => {
                                            console.log(data)
                                            if (loading) return 'Loading...';
                                            if (error) return `Error! ${error.message}`;
                                            return (
                                                <Select
                                                    native
                                                    value={this.state.selectCourse}
                                                    onChange={this.handleChangeCourse}
                                                    name="course"
                                                    inputProps={{
                                                        id: 'course-native-required',
                                                    }}
                                                >
                                                    <React.Fragment>
                                                        <option value=""></option>
                                                        {data.courses.map((course, index) => (
                                                            <option value={course._id} key={index} >{course.name}</option>
                                                        ))}
                                                    </React.Fragment></Select>
                                            );
                                        }}
                                    </Query>


                                </FormControl><br />

                                {/* <TextField required label="Course" className={classes.textField} margin="normal" inputRef={el => this.course = el} /><br /> */}
                                {/* <TextField required label="Address" className={classes.textField} margin="normal" inputRef={el => this.address = el} /><br /> */}
                                <TextField required label="Address" id="filled-multiline-static" multiline rows="3" className={classes.textField} margin="normal" inputRef={el => this.address = el} /><br />
                                <TextField required label="Birth Year" type="number" className={classes.textField} margin="normal" inputRef={el => this.birth_year = el} /><br />
                                <div>

                                    <FormControl component="fieldset" required className={classes.formControl}>
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender" onChange={this.handleChange} value={selectedGender}>
                                            {/* value={value} onChange={handleChange} */}
                                            <FormControlLabel
                                                value="F"
                                                control={<Radio color="primary" />}
                                                label="Female"
                                                labelPlacement="start"
                                            />
                                            <FormControlLabel
                                                value="M"
                                                control={<Radio color="primary" />}
                                                label="Male"
                                                labelPlacement="start"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again )</p>}
                        </div>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default withStyles(styles)(Create);