import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/AddEmployee';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/AddSalary';
import ViewSalary from './components/salary/ViewSalary';
import Summary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leave/LeaveList';
import AddLeave from './components/leave/AddLeave';
import Setting from './components/EmployeeDashboard/Setting';
import LeaveTable from './components/leave/LeaveTable';
import LeaveDetail from './components/leave/LeaveDetail';
import SalaryTable from './components/salary/SalaryTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>

        }>
          
          <Route index element={<AdminSummary />}></Route>
          <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/departments/add-department" element={<AddDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>

          <Route path="/admin-dashboard/employees" element={<EmployeeList />}></Route>
          <Route path="/admin-dashboard/employees/add-employee" element={<AddEmployee />}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<View />}></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
          
          <Route path="/admin-dashboard/salary" element={<SalaryTable/>}></Route>
          <Route path="/admin-dashboard/salary/add" element={<AddSalary/>}></Route>
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>
          
          <Route path="/admin-dashboard/leaves" element={<LeaveTable />}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetail />}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>

          <Route path="/admin-dashboard/setting" element={<Setting />}></Route>
        </Route>
        
        <Route path="/employee-dashboard" element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={['admin', 'employee']}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }>

            <Route index element={<Summary />}></Route>
            <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
            
            <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
            <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>
            
            <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
            
            <Route path='/employee-dashboard/settings' element={<Setting />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
