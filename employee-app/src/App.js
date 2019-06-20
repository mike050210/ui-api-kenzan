import React, {Component} from 'react';
import Main from './Main';
import AddEmployee from './EditEmployee';
import {Route} from 'react-router-dom'

class App extends Component
{
	constructor()
	{
		super();
		this.state = {
			employeeId : 0
		}
	}

	changeSelected = (employeeId) =>
 	{
		 this.setState({employeeId : employeeId});
  	}

	render()
	{
        return(
            <div>
                <Route exact path="/" render={()=>
                       <Main changeSelected={this.changeSelected}/>
                    } />

                <Route path="/employee" render={({history})=> (
                    <AddEmployee changeSelected={this.changeSelected} employeeId={this.state.employeeId} onAction={ ()=>{history.push('/')} }/>
                )} />
            </div>
        );
	}

}

export default App;