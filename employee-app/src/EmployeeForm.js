import React, {Component} from 'react'

class EmployeeForm extends Component
{
	render()
	{
		console.log(this.props.info)
		console.log(this.props.actions)
		return(
			<div >
				<div className="row">
					<div className="col s4 offset-sm-3">
						
						<input type="text" id="firstName" placeholder="Enter First Name"  value={this.props.info.firstName}   onChange={this.props.actions.changeFirstName}/>
						<input type="text" id="middleName" placeholder="Enter Middle Name" 
								value={this.props.info.middleName} onChange={this.props.actions.changeMiddleName}/>
						<input type="text" id="lastName" placeholder="Enter Last Name"     
								value={this.props.info.lastName} onChange={this.props.actions.changeLastName}/>
						<input type="text" id="dob" placeholder="Enter Date of Birth"     
								value={this.props.info.dateOfBirth} onChange={this.props.actions.changeDOB}/>
						<input type="text" id="dateEmployment" placeholder="Enter Date of Employment"
								value={this.props.info.dateOfEmployment} onChange={this.props.actions.changeDateEmployment}/>
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

export default EmployeeForm;