import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';

const LeaveTable = () => {
    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves, setFilteredLeaves] = useState(null)

    let sno = 1;

    const fetchLeaves = async ()=>{
      try{
        const response = await axios.get('https://ems-api-vert.vercel.app/api/leave', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.data.success) {
            const data = await response.data.leaves.map((leave)=> (
                {
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name,
                    days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate() + 1,
                    status: leave.status,
                    action: <LeaveButtons _id={leave._id} />
                }
            ))
            setLeaves(data);
            setFilteredLeaves(data);
        }
      } catch(error) {
          if(error.response && !error.response.data.success) {
              alert(error.response.data.error)
          }
      }
    }

    useEffect(()=>{
      fetchLeaves()
    }, [])

    const filterLeaves = (e) => {
      const records = leaves.filter(leave => 
        leave.employeeId.toLowerCase()
        .includes(e.target.value.toLowerCase())
      );
      
      setFilteredLeaves(records)
    }

    const filterByButton = (status) => {
      const records = leaves.filter(leave =>
        leave.status.toLowerCase().includes(status.toLowerCase())
      );

      setFilteredLeaves(records)
    }

  return (
    <>
      {filteredLeaves ? (
        <div className='p-6'>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className='flex justify-between items-center'>
            <input 
                type="text"
                onChange={filterLeaves}
                placeholder='Search By Emp ID'
                className='px-4 py-0.5 font-bold' 
            />
            <div className='space-x-3'>
              <button 
                className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-sm'
                onClick={() => (setFilteredLeaves(leaves))}
              > All</button>
              <button 
                className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-sm'
                onClick={() => filterByButton("Pending")}
              > Pending</button>
              <button 
                className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-sm'
                onClick={() => filterByButton("Approved")}
              > Approved</button>
              <button 
                className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-sm'
                onClick={() => filterByButton("Rejected")}
              > Rejected</button>
            </div>
          </div>
          <div className='mt-3'>
            <DataTable columns = {columns} data={filteredLeaves} pagination/> 
          </div>
        </div>
      ) : <div>Loading...</div>}
    </>
  )
}

export default LeaveTable
