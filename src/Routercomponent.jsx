import AddEmployeeForm from "./Components/Employees/AddEmployeeForm";
import EditEmployeeFrom from "./Components/Employees/EditEmployeeFrom";
import EmployeesTable from "./Components/Employees/EmployeesTable";
import Login from "./Components/Login/Login";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/employeestable" element={<EmployeesTable />} />
        <Route path="/addemployee" element={<AddEmployeeForm />} />
        <Route path="/editemployee" element={<EditEmployeeFrom />} />
      </Route>
    </>
  )
);

function Routercomponent() {
  return <RouterProvider router={router} />;
}

export default Routercomponent;
