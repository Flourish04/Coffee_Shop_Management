import Header from "../components/common/Header";
import EmployeeTable from "../components/employees/EmployeeTable";

const EmployeePage = () => {
    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title="Employee"/>
            <EmployeeTable/>
        </div>
    )
}

export default EmployeePage;