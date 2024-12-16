import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeBottons } from '../../utils/EployeeHelpers'
import DataTable from 'react-data-table-component'

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployees, setFilteredEmployees] = useState([])

    useEffect(()=>{
      const fetchEmployees = async ()=> {
          setEmpLoading(true)
          try{
              const response = await axios.get('http://localhost:5000/api/employee', {
                  headers: {
                      "Authorization" : `Bearer ${localStorage.getItem('token')}`
                  }
              })

              if(response.data.success) {
                  let sno = 1;
                  const data = await response.data.employees.map((emp)=> (
                      {
                          _id: emp._id,
                          sno: sno++,
                          dep_name: emp.department.dep_name,
                          name: emp.userId.name,
                          dob: new Date(emp.dob).toLocaleDateString(),
                          profileImage: <img width={40} className='rounded-full h-11' src={`http://localhost:5000/${emp.userId.profileImage}`} /> ,
                          action: <EmployeeBottons _id={emp._id} />
                      }
                  ))
                  setEmployees(data);
                  setFilteredEmployees(data);
              }
          } catch(error) {
              if(error.response && !error.response.data.success) {
                  alert(error.response.data.error)
              }
          } finally {
              setEmpLoading(false)
          }
      }
      fetchEmployees();
    }, []);

    const handleFilter = (e)=>{
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployees(records)
    }

  return (
    <div className='p-6'>
      <div className='text-center'>
            <h3 className='text-3xl font-bold'>Manage Employees</h3>
        </div>
        
        <div className='flex justify-between items-center'>
            <input 
                type="text" 
                placeholder='Search By Name' 
                className='px-4 py-0.5 border'
                onChange={handleFilter}
            />
            <Link 
                to="/admin-dashboard/employees/add-employee" 
                className='px-4 py-1 bg-teal-600 rounded text-white'
            > Add New Employee</Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredEmployees} pagination/>
      </div>
    </div>
  )
}

export default EmployeeList
