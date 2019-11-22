import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const useStylesForList = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
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
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
})
function HigherOrderComponent(props) {
    const { classes } = props;
}

class Show extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Query pollInterval={500} query={GET_STUDENT} variables={{ studentId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6">{data.student.name} - Details</Typography>
                                </Toolbar>
                            </AppBar>
                            <div className="buttonBadge"><Button variant="contained" color="default" href="/" className={"backBtn"} >Home</Button></div>
                            <div className={classes.root}>
                                <Paper className={classes.paper}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item xs>
                                            <Typography className="cardHeader">Name:</Typography>
                                            <Typography>{data.student.name}</Typography>
                                            <Typography className="cardHeader">Rollnumber:</Typography>
                                            <Typography>{data.student.rollnumber}</Typography>
                                            <Typography className="cardHeader">Course:</Typography>
                                            <Typography>{data.student.course.name}</Typography>
                                            <Typography className="cardHeader">Birth Year:</Typography>
                                            <Typography>{data.student.birth_year}</Typography>
                                            <Typography className="cardHeader">Gender:</Typography>
                                            <Typography>{data.student.gender == "M" ? 'Male' : 'Female'}</Typography>
                                            <Typography className="cardHeader">Address:</Typography>
                                            <Typography>{data.student.address}</Typography>
                                            <Typography className="cardHeader">Updated:</Typography>
                                            <Typography>{data.student.updated_date}</Typography>
                                            <Mutation mutation={DELETE_STUDENT} key={data.student._id} onCompleted={() => this.props.history.push('/')}>
                                                {(removeStudent, { loading, error }) => (
                                                    <div>
                                                        <form
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                removeStudent({ variables: { id: data.student._id } });
                                                            }}>
                                                            <Link to={`/edit/${data.student._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                  <button type="submit" className="btn btn-danger">Delete</button>
                                                        </form>
                                                        {loading && <p>Loading...</p>}
                                                        {error && <p>Error :( Please try again</p>}
                                                    </div>
                                                )}
                                            </Mutation>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default withStyles(styles)(Show);