import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

  useEffect(()=> {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('https://ems-api-vert.vercel.app/api/dashboard/summary', {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}` 
          }
        })

        setSummary(summary)
      } catch(error) {
        if(error.response){
          alert(error.response.data.error)
        }
      }
    }
    fetchSummary()
  }, [])

  if(!summary){
    return <div>Loading...</div>
  }

  return (
    <div className='p-6 '>
      
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers />} text={"Total Employees"} number={summary.data.totalEmployee} color={"bg-teal-600"}/>
        <SummaryCard icon={<FaBuilding />} text={"Total Departments"} number={summary.data.totalDepartments} color={"bg-yellow-600"}/>
        <SummaryCard icon={<FaMoneyBillWave />} text={"Mothly Salary"} number={summary.data.totalSalary} color={"bg-red-600"}/>
      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <SummaryCard icon={<FaFileAlt />} text={"Leave Applied"} number={summary.data.leaveSummary.applied} color={"bg-teal-600"}/>
          <SummaryCard icon={<FaCheckCircle />} text={"Leave Approved"} number={summary.data.leaveSummary.approved} color={"bg-green-600"}/>
          <SummaryCard icon={<FaHourglassHalf />} text={"Leave Pending"} number={summary.data.leaveSummary.pending} color={"bg-yellow-600"}/>
          <SummaryCard icon={<FaTimesCircle />} text={"Leave Rejected"} number={summary.data.leaveSummary.rejected} color={"bg-red-600"}/>
        </div>
      
      </div>
    </div>
  )
}

export default AdminSummary
