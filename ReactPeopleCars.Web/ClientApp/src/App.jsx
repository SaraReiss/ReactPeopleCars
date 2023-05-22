import React from 'react';
import {Route, Link} from 'react-router-dom';
import HomePage from './HomePage';
import AddPerson from './AddPerson';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';
import Layout from './Layout';




class App extends React.Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/AddPerson' component={AddPerson} />
                <Route exact path='/AddCar/:id' component={AddCar} />
                <Route exact path='/DeleteCars/:id' component={DeleteCars} />
                
            </Layout>
        );
    }
};

export default App;