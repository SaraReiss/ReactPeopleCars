
import React from 'react';
import PersonRow from './PersonRow';
import AddPerson from './AddPerson';
import axios from 'axios';
import { produce } from 'immer';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        cars: [],
        Car: {
            make: '',
            model: '',
            year: ''
        },



    }

    componentDidMount = async () => {
        await this.refreshPeople();
    }

    refreshPeople = async () => {
        const response = await axios.get('/api/people/getall');
        const people = response.data;
        this.setState({ people });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddPersonClick = async () => {
        await axios.post('/api/people/addPerson', this.state.person);
        await this.refreshPeople();
        this.resetToAddMode();
    }


    resetToAddMode = () => {
        this.setState({

            person: {
                firstName: '',
                lastName: '',
                age: ''
            },

        })
    }

    onCancelClick = () => {
        this.resetToAddMode();
    }

    onDeleteClick = async id => {
        await axios.post('/api/people/delete', { id });
        this.refreshPeople();

    }



    onDeleteAllClick = async () => {
        await axios.post('/api/people/deletemany', { ids: this.state.peopleToDelete });
        await this.refreshPeople();
    }



    render() {
        return (


          <div>

                <div className="row mt-5">
                    <div className="col-md-12" style={{ marginBottom: "20px" }}>
                        <Link to={`/addperson/`}>
                            <button className="btn btn-success btn-lg w-100">Add Person</button>
                        </Link>

                    </div>
                </div>

                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Car Count</th>
                            <th>Add Car</th>
                            <th>Delete Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p =>
                            <PersonRow
                                key={p.id}
                                person={p}
                            //onDeleteClick={() => this.onDeleteClick(p.id)}
                            //isSetToDelete={this.state.peopleToDelete.includes(p.id)}
                            //onSetToDeleteChange={() => this.onSetToDeleteChange(p.id)}
                            />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default HomePage;