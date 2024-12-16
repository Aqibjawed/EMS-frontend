import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/SalaryHelper';

const SalaryTable = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setfilteredSalaries] = useState(null);
    const navigate = useNavigate()
    let sno = 1;

    const filterSalaries = (e) =>{
        const records = salaries.filter((salary) => (
            salary.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        
        setfilteredSalaries(records)
    }

    useEffect(()=>{
        const fetchSalaries = async () => {
            try{
                const response = await axios.get('https://ems-api-vert.vercel.app/api/salary', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success){
                    const data = response.data.salaries.map(salary => (
                        {
                            _id: salary._id,
                            sno: sno++,
                            name: salary.employeeId.userId.name,
                            employeeId: salary.employeeId.employeeId,
                            department: salary.employeeId.department.dep_name,
                            basicSalary: salary.basicSalary,
                            allowances: salary.allowances,
                            deductions: salary.deductions,
                            netSalary: salary.netSalary,
                            payDate: new Date(salary.payDate).toLocaleDateString(),
                        }
                    ))
                    setSalaries(data)
                    setfilteredSalaries(data)
                }
            } catch(error){
                if(error.response){
                    alert(error.response.data.error)
                }
            }

        }
        fetchSalaries()
    }, [])

    if(!salaries){
        return <div>Loading...</div>
    }

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>Salary Records</h2>
      </div>
      <div className='flex justify-between items-center'>
        <input 
            type="text"
            onChange={filterSalaries}
            placeholder='Search by Emp Name'
            className='px-4 py-0.5 font-bold' 
        />
        <div>
            <Link 
                to="/admin-dashboard/salary/add" 
                className='px-4 py-1 bg-teal-600 rounded text-white'
            > Give Salary </Link>
        </div>
      </div>
      <div className='mt-3'>
        <>{filteredSalaries ? (
            <DataTable columns={columns} data={filteredSalaries} pagination/>
        ) : (
            <div>No Records of Salaries</div>
        )}</>
      </div>

    </div>
  )
}

export default SalaryTable
