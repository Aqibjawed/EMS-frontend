import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentBottons } from '../../utils/DepartmentHelper'
import axios from 'axios'

const DepartmentList = () => { 

    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete = ()=>{
        fetchDepartments()
    }

    const filterDepartments = (e)=>{
        const records = departments.filter((dep) => 
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredDepartments(records)
    }

    const fetchDepartments = async ()=> {
        setDepLoading(true)
        try{
            const response = await axios.get('https://ems-api-vert.vercel.app/api/department', {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(response.data.success) {
                let sno = 1;
                const data = await response.data.departments.map((dep)=> (
                    {
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: <DepartmentBottons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>
                    }
                ))
                setDepartments(data);
                setFilteredDepartments(data);
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setDepLoading(false)
        }
    }

    useEffect(()=>{
        fetchDepartments();
    }, []);

  return (
    <>{depLoading ? <div>Loading...</div> : 
        <div className='p-5'>
        
        <div className='text-center'>
            <h3 className='text-3xl font-bold'>Manage Departments</h3>
        </div>
        
        <div className='flex justify-between items-center'>
            <input 
                type="text" 
                placeholder='Search By Dep Name' 
                className='px-4 py-0.5 border'
                onChange={filterDepartments}
            />
            <Link 
                to="/admin-dashboard/departments/add-department" 
                className='px-4 py-1 bg-teal-600 rounded text-white'
            > Add New Department</Link>
        </div>
        <div className='mt-5'>
            <DataTable columns={columns} data={filteredDepartments} pagination/>
        </div>
        </div>
    }</>
  )
}

export default DepartmentList
