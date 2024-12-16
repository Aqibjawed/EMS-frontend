

export const columns = [
    {
        name: 'S NO',
        selector: (row) => row.sno,
        width: '70px'
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        width: '120px',
    },
    {
        name: 'Employee ID',
        selector: (row) => row.employeeId,
        width: '140px'
    },
    {
        name: 'Department',
        selector: (row) => row.department,
        width: '140px'
    },
    {
        name: 'Basic Salary',
        selector: (row) => row.basicSalary,
        width: '100px'
    },
    {
        name: 'Allowances',
        selector: (row) => row.allowances,
        width: '100px'
    },
    {
        name: 'Deductions',
        selector: (row) => row.deductions,
        width: '100px'
    },
    {
        name: 'Net Salary',
        selector: (row) => row.netSalary,
        width: '100px'
    },
    {
        name: 'Pay Date',
        selector: (row) => row.payDate,
        width: '100px'
    },
]