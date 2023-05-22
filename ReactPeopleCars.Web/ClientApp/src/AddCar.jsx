import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

class AddCar extends React.Component {

   state ={
    car:{
        make:'',
        model:'',
        year:'',
        personId:'',
    },
    person:{
        firstName:'',
        lastName:''
    }
   }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getbyid?id=${id}`);
        this.setState({
            car:
            {
                personId: id,
            },
            person:{
                firstName: data.firstName,
                lastName: data.lastName,
            }
           
       })
    }
    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitClick = async () => {
        await axios.post('/api/people/addcar', this.state.car);
        this.props.history.push('/');
    }

    render() {
        const { make, model, year } = this.state.car;
        const {firstName, lastName} = this.state.person;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 card bg-light p-4" style={{ marginTop: 200 }}>
                    <h2>Add a car for {firstName} {lastName}</h2>
                    <input type="text" value={make} name='make' onChange={this.onTextChange} className="form-control" placeholder="Make" />
                    <br />
                    <input type="text" value={model} name='model' onChange={this.onTextChange} className="form-control" placeholder="Model" />
                    <br />
                    <input type="text" value={year} name='year' onChange={this.onTextChange} className="form-control" placeholder="Year" />
                    <br />
                    <button disabled={isNaN(year) || make === '' || model === '' || year === ''} onClick={this.onSubmitClick} className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        )
    }
}

export default AddCar;