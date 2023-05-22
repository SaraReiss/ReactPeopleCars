import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DeleteCars extends React.Component {

    state = {
        personId: 0,
        cars: [],
    }

    onDeleteClick = async () => {
        await axios.post(`/api/people/deletecarsforpersonid?id=${this.state.personId}`);
        this.props.history.push('/');
    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getcarsforpersonid?id=${id}`);
        this.setState({ cars: data, personId: id });

    }


    render() {
        return (
            <div>

                <div className="row">
                    <div class="col-md-10">
                        <input type="text" className="form-control form-control-lg" placeholder="Search Cars" value={""} />
                    </div>
                    <div className="col-md-2"><button className="btn btn-dark btn-lg w-100">Clear</button>
                    </div>
                </div>
                <br></br>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cars.map(c =>
                            <tr key={c.id}>

                                <td>{c.make}</td>
                                <td>{c.model}</td>
                                <td>{c.year}</td>

                            </tr>)}
                    </tbody>
                </table>
                <div className="row mt-5">
                    <div className="col-md-12" style={{ marginBottom: "20px" }}>
                        <h2>Are you sure you want to delete all these cars?</h2>
                    </div>
                    <div className="col-md-6" style={{ margintop: "20px" }}>
                        <Link to={`/`}>
                            <button style={{ textdecoration: "none" }} className="btn btn-primary btn-lg w-100">No</button>
                        </Link>
                    </div>
                    <div className="col-md-6" style={{ margintop: "20px" }}>
                        <button onClick={this.onDeleteClick} className="btn btn-danger btn-lg w-100">Yes</button>
                    </div>

                </div>
            </div>

        )
    }
}



export default DeleteCars;