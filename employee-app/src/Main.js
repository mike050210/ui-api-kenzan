import React, {Component} from 'react';
import EmployeeSet from './EmployeeSet';
import axios from 'axios';
import {Link} from 'react-router-dom';


class Main extends Component
{
  constructor()
  {
    super();
    this.state = {employees: []};
  }

  componentDidMount()
  {
    this.getEmployees();
  }

  getEmployees = ()=>
  {
    //Get all employees

    const config = {
    headers: {'Accept':'application/json'}
    }

    const url = 'http://localhost:8080/api/employees'
    axios.get(url, config).then(
      (resp) => { 
        const employees = resp.data.map(employee => {
          const empl = {
            employeeID : employee.employeeID,
            firstName : employee.firstName,
            middleName : employee.middleName,
            lastName : employee.lastName,
            dob: this.getFormattedDate(employee.dob),
            employmentDate: this.getFormattedDate(employee.employmentDate)
          }
          
          return empl;
        });
        
        
        this.setState({employees: employees})
      },
      () => { console.log("Error trying to reach service") });
  }



  getFormattedDate = (date) =>
  {
  
    if (date !== null)
    {
      let datetime = new Date(date)
      let formatted_date = (datetime.getMonth() + 1) + "/" + (datetime.getDate()+1) + "/" + datetime.getFullYear()
      return formatted_date;
    }
    else
    {
      return "";
    }
    
  }

  removeEmployee = (employeeId) =>
  {
      console.log("Employee:" + employeeId);


      // Users: kenzan/live, miguel/abc123
      const username = 'kenzan'; 
      const password = 'live';    
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const config = {
        'headers': {
          'Authorization': basicAuth,
        }
      }

      const url = `http://localhost:8080/api/employees/${employeeId}`
      axios.delete(url, config).then(
        (resp) => {this.getEmployees()},
        () => { console.log("Error trying to reach service") });
  }

  

  render()
  {

    return (

      <div className="row">
        <div className="col s9 offset-s1 center">
            <h2>Employees</h2>
            <div>
              <Link to="/employee" className="btn waves-light waves-effect" 
                  onClick={()=>this.props.changeSelected(0)}>Add Employee</Link>
            </div>
            <EmployeeSet changeSelected={this.props.changeSelected}
                  employees={this.state.employees} 
                  delete={this.removeEmployee}/>
            
        </div>

        <div className="valign-wrapper center-align">
        
        </div>
      </div>
      
    );
  }
  
}

export default Main;
