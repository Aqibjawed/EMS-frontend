import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from 'axios'

const LeaveList = () => {
    const {user} = useAuth()
    const [leaves, setLeaves] = useState([])
    const [filteredLeaves, setFilteredLeaves] = useState([])

    let sno=1;

    const {id} = useParams()

    const filterLeaves = (e) =>{
        const records = leaves.filter((leave) => 
            leave.leaveType.toLowerCase().includes(e.toLowerCase())
        );
        console.log(records)
        setFilteredLeaves(records)
    }

    const fetchLeaves = async ()=>{
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            if(response.data.success){
                setLeaves(response.data.leaves);
                setFilteredLeaves(response.data.leaves);
            }
        } catch(error){
            if(error.response && !error.response.data.success) {
                alert(error.message)
            }
        }
    }
    useEffect(()=>{
        fetchLeaves()
    }, [])

  return (
    <div className='p-6'>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input 
            type="text"
            onChange={(e) => filterLeaves(e.target.value)}
            placeholder='Search By Leave Type'
            className='px-4 py-0.5 font-bold' 
        />

        {user.role === 'employee' &&
        <Link
            to='/employee-dashboard/add-leave'
            className='px-4 py-1 bg-teal-600 rounded text-white'
        >
            Request Leave 
        </Link>
        }
        
      </div>

      {(filteredLeaves && filteredLeaves.length > 0) ? (
        <table className='w-full text-sm text-left text-gray-500 mt-6'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                    <tr>
                        <th className='px-6 py-3'>SNO</th>
                        <th className='px-6 py-3'>Leave Type</th>
                        <th className='px-6 py-3'>From</th>
                        <th className='px-6 py-3'>To</th>
                        <th className='px-6 py-3'>Description</th>
                        <th className='px-6 py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLeaves.map((leave) =>(
                        <tr
                            key={leave._id}
                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                        >
                            <td className='px-6 py-3'>{sno++}</td>
                            <td className='px-6 py-3'>{leave.leaveType}</td>
                            <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className='px-6 py-3'>{leave.reason}</td>
                            <td className='px-6 py-3'>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>      
      ) : filteredLeaves ? (
        <div className='mt-6'>No Leaves Found</div>
      ) :  (
        <div className='mt-6'>Loading...</div>
      )}
    </div>
  )
}

export default LeaveList
