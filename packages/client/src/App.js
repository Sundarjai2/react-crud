import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import classNames from 'classnames';

const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      gender
      course {
        _id
        name
      }
    }
  }
`;
const GET_STUDENT = gql`
    query student($studentId: String) {
        student(id: $studentId) {
            _id
            name
            course {
              _id
              name
            }
            rollnumber
            address
            birth_year
            gender
            updated_date
        }
    }
`;

const DELETE_STUDENT = gql`
  mutation removeStudent($id: String!) {
    removeStudent(id:$id) {
      _id
    }
  }
`;

const GET_COURSES = gql`
  {
    courses {
      _id
      name
      courseID
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  addLink: {
    color: '#ffffff'
  },
  editBtnAction:{
    
    marginRight: theme.spacing(2),
  }
}));

function App(props) {
  const classes = useStyles();
  return (

    <Query pollInterval={500} query={GET_STUDENTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (

          <div className="container">
            <AppBar position="static">
              <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
                <Typography variant="h6" className={classNames({ [classes.title]: true, [useStyles.addLink]: true })}>
                  LIST OF STUDENTS
            </Typography>
                {/* <Button color="inherit">Login</Button> */}
              </Toolbar>
            </AppBar>
            <Button variant="contained" href="/create" color="primary" className={classes.button, "addBtn"}>
              Add Student</Button>
            <Paper className={classes.root}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>SI No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.course.name}</TableCell>
                      <TableCell>{student.gender === "M" ? 'Male' : 'Female'}</TableCell>
                      <TableCell>
                        <div className="gridAvtionBtnGroup">
                          <Button variant="contained" color="primary" className={classes.button, classes.margin, classes.editBtnAction, "editStd"}><Link to={`/show/${student._id}`}>Show</Link></Button>
                          <Mutation mutation={DELETE_STUDENT} key={student._id} onCompleted={() => props.history.push('/')}>
                            {(removeStudent, { loading, error }) => (
                              <div className="pull-left">
                                <form
                                  onSubmit={e => {
                                    e.preventDefault();
                                    removeStudent({ variables: { id: student._id } });
                                  }}>
                                    <Button variant="contained" type="submit" color="secondary" className={classes.button, classes.margin, "editStd"}>Delete</Button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                              </div>
                            )}
                          </Mutation>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

          </div>
        );
      }}
    </Query>
  );
}

export default App;
