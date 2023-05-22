import React from 'react';
import { Link } from 'react-router-dom';

function PersonRow(props) {
   
    const { firstName, lastName, age, id } = props.person;

    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{props.person.cars.length}</td>
            <td>
                <Link to={`/AddCar/${id}`}>
                    <button className="btn btn-primary">Add Car</button>
                </Link>
            </td>
            <td>
            <Link to={`/DeleteCars/${id}`}>
                    <button className="btn btn-danger">Delete Cars</button>
                </Link>
                
            </td>
        </tr>
    );
}

export default PersonRow;