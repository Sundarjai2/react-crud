import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormLabel from '@material-ui/core/FormLabel';
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const GET_STUDENT = gql`
    query student($studentId: String) {
        student(id: $studentId) {
            _id
            name
            course {
                _id
                name
                courseId
            }
            rollnumber
            address
            birth_year
            gender
            updated_date
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

const UPDATE_STUDENT = gql`
    mutation updateStudent(
        $id: String!,
        $name: String!,
        $course: String!,
        $rollnumber: String!,
        $address: String!,
        $gender: String!,
        $birth_year: Int!) {
        updateStudent(
        id: $id,
        name: $name,
        course: $course,
        rollnumber: $rollnumber,
        address: $address,
        gender: $gender,
        birth_year: $birth_year) {
            updated_date
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
})

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedGender: "", selectCourse: "" };
    }

    getStudentComplete = data => {
        this.setState({ selectedGender: data.student.gender, selectCourse: data.student.course._id });
        console.log(data.student.gender)
    }

    handleChange = ev => {
        this.setState({ selectedGender: ev.target.value });
    };
    handleChangeCourse = event => {
        this.setState({ selectCourse: event.target.value });
    };
    render() {
        const { selectedGender, selectCourse } = this.state;
        const { classes } = this.props;

        let name, course, rollnumber, address, birth_year, gender;
        return (
            <Query query={GET_STUDENT} variables={{ studentId: this.props.match.params.id }} onCompleted={this.getStudentComplete}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_STUDENT} key={data.student._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateStudent, { loading, error }) => (
                                <div className="container">
                                    <AppBar position="static">
                                        <Toolbar>
                                            <Typography variant="h6">
                                                Edit {data.student.name} - Details
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <div className="buttonBadge"><Button variant="contained" color="default" href="/" className={"backBtn"} >Home</Button></div>
                                    <div className="panel-body">

                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            updateStudent({ variables: { id: data.student._id, name: this.name.value, course: this.state.selectCourse, rollnumber: this.rollnumber.value, address: this.address.value, gender: this.state.selectedGender, birth_year: parseInt(this.birth_year.value) } });
                                            this.name.value = "";
                                            this.rollnumber.value = "";
                                            this.selectCourse = "";
                                            this.address.value = "";
                                            this.selectedGender = "";
                                            this.birth_year.value = "";
                                        }}>
                                            <TextField required type="number" InputProps={{ readOnly: true, }} label="Rollnumber" defaultValue={data.student.rollnumber} className={classes.textField} margin="normal" inputRef={el => this.rollnumber = el} /><br />
                                            <TextField required label="Student Name" defaultValue={data.student.name} className={classes.textField} margin="normal" inputRef={el => this.name = el} /><br />
                                            <FormControl required className={classes.formControl}>
                                                <InputLabel htmlFor="course-native-required">Course</InputLabel>


                                                <Query pollInterval={500} query={GET_COURSES}>
                                                    {(cData) => {
                                                        if (cData.loading) return 'Loading...';
                                                        if (cData.error) return `Error! ${cData.error.message}`;
                                                        return (
                                                            <NativeSelect
                                                                value={this.state.selectCourse}
                                                                onChange={this.handleChangeCourse}
                                                                name="course"
                                                                inputProps={{
                                                                    id: 'course-native-required',
                                                                }}
                                                            >
                                                                <React.Fragment>
                                                                    <option value="" ></option>
                                                                    {cData.data.courses.map((course, index) => (
                                                                        <option value={course._id} key={index} >{course.name}</option>
                                                                    ))}
                                                                </React.Fragment>
                                                            </NativeSelect>
                                                        );
                                                    }}
                                                </Query>


                                            </FormControl><br />
                                            {/* <TextField required label="Course" defaultValue={data.student.course.name} className={classes.textField} margin="normal" inputRef={el => this.course = el} /><br /> */}
                                            <TextField required label="Address" id="filled-multiline-static" multiline rows="3" defaultValue={data.student.address} className={classes.textField} margin="normal" inputRef={el => this.address = el} /><br />
                                            <TextField required label="Birth Year" type="number" defaultValue={data.student.birth_year} className={classes.textField} margin="normal" inputRef={el => this.birth_year = el} /><br />
                                            <div>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormLabel type="number" component="legend">Gender</FormLabel>
                                                    <RadioGroup aria-label="gender" name="gender" onChange={this.handleChange} value={this.state.selectedGender}>
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
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}
export default withStyles(styles)(Edit);