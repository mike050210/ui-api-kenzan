import React, {Component} from 'react'
import axios from 'axios';

class EditEmployee extends Component
{

	constructor()
	{
		super();
		this.state = {
			employeeID : 0,
			firstName : "",
			middleName : "",
			lastName : "",
			dob: "",
			employmentDate: ""
		}
	}

	changeFirstName = (e) => {
		this.setState({firstName : e.target.value})
	}

	changeMiddleName = (e) => {
		this.setState({middleName : e.target.value})
	}

	changeLastName = (e) => {
		this.setState({lastName : e.target.value})
	}

	changeDOB = (e) => {
		this.setState({dob : e.target.value})
	}

	changeDateEmployment = (e) => {
		this.setState({employmentDate : e.target.value})
	}

	componentDidMount()
  	{
		if(this.props.employeeId !== 0)
		{
			this.getEmployee(this.props.employeeId);
		}
		else{
			this.setState({employeeID: 0});
		}
	}
	
	getEmployee = (employeeId)=>
	{
		//Get employee by Id
		console.log("employee: " + employeeId)

		const config = {
					headers: {'Accept':'application/json'}
				}

		const url = `http://localhost:8080/api/employees/${employeeId}`;

		axios.get(url, config).then(
		(resp) => {
			if(typeof resp !== 'undefined')
			{
				console.log("Employee Service call successful");
				console.log(resp.data);
				this.setState({
					employeeID : resp.data.employeeID,
					firstName : resp.data.firstName,
					middleName : resp.data.middleName,
					lastName : resp.data.lastName,
					dob: this.getFormattedDate(resp.data.dob),
					employmentDate: this.getFormattedDate(resp.data.employmentDate)
				})
			}

		}, () => { console.log("Error trying to reach service") });

	}

	getFormattedDate = (date) =>
	{
	
	  if (date !== null)
	  {
		let datetime = new Date(date)
		let formatted_date = (datetime.getMonth() + 1) + "/" + (datetime.getDate() + 1) + "/" + datetime.getFullYear()
		return formatted_date;
	  }
	  else
	  {
		return "";
	  }
	  
	}


	handleSubmit = (e)=>
	{
		e.preventDefault();
		console.log("Submitted");

		const config = {
			headers: {'content-type':'application/json'}
			}

		const employee = 
			{
				employeeID : this.state.employeeID,
				firstName : this.state.firstName,
				middleName : this.state.middleName,
				lastName : this.state.lastName,
				dob: this.parseDate(this.state.dob),
				employmentDate: this.parseDate(this.state.employmentDate),
				status: "ACTIVE"
			}

		console.log(employee);
		if(this.state.employeeID === 0)
		{
			const url = 'http://localhost:8080/api/employees';

			axios.post(url, employee, config).then(
				(resp) => {this.setState({employeeID: resp.data.employeeID})},
				() => { console.log("Error trying to reach service") });
		}
		else
		{
			const url = `http://localhost:8080/api/employees/${this.state.employeeID}`;
			axios.put(url, employee, config).then(
				(resp) => {this.setState({employees: resp.data})},
				() => { console.log("Error trying to reach service") });
		}
		

	}

	parseDate = (strDate) =>
	{
		let formattedDate = ""
		
		const parts = strDate.split("/");

		if(parts.length === 3)
		{
			const date = new Date(parts[2], parts[0] - 1, parts[1] - 1);
			return date.getTime();
		}

		return formattedDate;
	}

	handleCancel = () =>
	{
		this.props.changeSelected(0);
		this.props.onAction();
		
	}

	render()
	{
		const title = this.state.employeeID === 0 ? <h3>Add new Employee</h3>  : <h3>Edit Employee {this.state.employeeID}</h3>;

		return(
			<div className="container">
				{title}
				<div className="row">
					<form onSubmit={this.handleSubmit}>
						
							<div className="col s4 offset-sm-3">
								
								<input type="text" id="firstName" placeholder="Enter First Name"  
										value={this.state.firstName}   onChange={this.changeFirstName}/>
								<input type="text" id="middleName" placeholder="Enter Middle Name" 
										value={this.state.middleName} onChange={this.changeMiddleName}/>
								<input type="text" id="lastName" placeholder="Enter Last Name"     
										value={this.state.lastName} onChange={this.changeLastName}/>
								<input type="text" id="dob" placeholder="Enter Date of Birth"     
										value={this.state.dob} onChange={this.changeDOB}/>
								<input type="text" id="dateEmployment" placeholder="Enter Date of Employment"
										value={this.state.employmentDate} onChange={this.changeDateEmployment}/>
							</div>
							<button className="btn waves-light waves-effect">Save</button>	
												
					</form>
					<button className="btn waves-light waves-effect red" onClick={this.handleCancel}>Cancel</button>
				</div>
			</div>
		);
	}
}
export default EditEmployee;