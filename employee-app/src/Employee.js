import React, {Component} from 'react';

class Employee extends Component
{
	render()
	{
		return(
			<div>
				<div>
					<div className="card-content">
						<p><b>Employee No.:</b> {this.props.employee.employeeID}</p>
						<p><b>First name:</b> {this.props.employee.firstName}</p>
						<p><b>First name:</b> {this.props.employee.middleName}</p>
						<p><b>Last name:</b> {this.props.employee.lastName}</p>
						<p><b>Day of Birth:</b> {this.props.employee.dob}</p>
						<p><b>Date of Employment:</b> {this.props.employee.employmentDate}</p>
					</div>			
				</div>
			</div>
			
		);
	}
	
}
/*
ID - Unique identifier for an employee
FirstName - Employees first name
MiddleInitial - Employees middle initial
LastName - Employeed last name
DateOfBirth - Employee birthday and year
DateOfEmployment - Employee start date
Status - ACTIVE or INACTIVE
*/

export default Employee;