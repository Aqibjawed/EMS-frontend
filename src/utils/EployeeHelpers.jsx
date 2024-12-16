import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const fetchDepartments = async ()=> {
    let departments
    try{
        const response = await axios.get('https://ems-api-vert.vercel.app/api/department', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.data.success) {
            departments = response.data.departments
        }
    } catch(error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments;
};

// Employees for Salary form
export const getEmployees = async (id)=> {
    let employees;
    try{
        const response = await axios.get(`https://ems-api-vert.vercel.app/api/employee/department/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.data.success) {
            employees = response.data.employee
        }
    } catch(error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return employees;
};

export const EmployeeBottons = ({_id})=> {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button 
                className="px-4 py-1 bg-teal-600 text-white"
                onClick={()=> navigate(`/admin-dashboard/employees/${_id}`)}
            > View</button>

            <button 
                className="px-4 py-1 bg-blue-600 text-white"
                onClick={()=> navigate(`/admin-dashboard/employees/edit/${_id}`)}
            > Edit</button>

            <button 
                className="px-4 py-1 bg-yellow-600 text-white"
                onClick={()=> navigate(`/admin-dashboard/employees/salary/${_id}`)}
            > Salary</button>

            <button 
                className="px-4 py-1 bg-red-600 text-white"
                onClick={()=> navigate(`/admin-dashboard/employees/leaves/${_id}`)}
            > Leave</button>
        </div>
    )
}

export const columns = [
    {
        name: "S No",
        selector: (row)=> row.sno,
        width: "70px" 
    },
    {
        name: "Name",
        selector: (row)=> row.name,
        sortable: true,
        width: "130px"
    },
    {
        name: "Image",
        selector: (row)=> row.profileImage,
        width: "90px",
    },
    {
        name: "Department",
        selector: (row)=> row.dep_name,
        width: "100px"
    },
    {
        name: "DOB",
        selector: (row)=> row.dob,
        sortable: true,
        width: "130px"
    },
    {
        name: "Action",
        selector: (row)=> row.action,
        center: true    
    },
]