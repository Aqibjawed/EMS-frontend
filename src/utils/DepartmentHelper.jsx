import { useNavigate } from "react-router-dom"
import axios from 'axios'
 

export const columns = [
    {
        name: "S No",
        selector: (row)=> row.sno    
    },
    {
        name: "Department Name",
        selector: (row)=> row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row)=> row.action    
    },
]

export const DepartmentBottons = ({_id, onDepartmentDelete})=> {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do You Want To Delete The Department")
        if(confirm){
            try{
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
    
                if(response.data.success) {
                    onDepartmentDelete()
                }
            } catch(error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    }
 
    return (
        <div className="flex space-x-3">
            <button 
                className="px-4 py-1 bg-teal-600 text-white"
                onClick={()=> navigate(`/admin-dashboard/department/${_id}`)}
            > Edit</button>
            <button 
                className="px-4 py-1 bg-red-600 text-white"
                onClick={() => handleDelete(_id)}
            > Delete</button>
        </div>
    )
}