import React, {Component} from 'react';
import Employee from './Employee';
import {Link} from 'react-router-dom'

class EmployeeSet extends Component
{
	render()
	{
		const employeeList = this.props.employees.map((employee, i) => {
            return (
                    <div key={i} className="col s3 card hoverable small">
                        <Employee employee={employee}/>
						<Link to="/employee" 
								className="btn waves-light waves-effect" 
								onClick={()=>this.props.changeSelected(employee.employeeID)}>Edit</Link>
						<button className="btn waves-light waves-effect red" 
								onClick={()=>this.props.delete(employee.employeeID)}>Remove</button>
                    </div>
                );
            }
		)
		

		return(
			<div>
				<div className="row">
					{employeeList}
				</div>
			</div>
		);
	}
}

export default EmployeeSet;
