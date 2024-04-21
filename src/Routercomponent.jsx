import AddEmployeeForm from "./Components/Employees/AddEmployeeForm";
import EditEmployeeFrom from "./Components/Employees/EditEmployeeFrom";
import EmployeesTable from "./Components/Employees/EmployeesTable";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Feedback from "./Components/Employees/Feedback";
import FeedbackEdit from "./Components/Employees/FeedbackEdit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/employeestable" element={<EmployeesTable />} />
        <Route path="/addemployee" element={<AddEmployeeForm />} />
        <Route path="/editemployee" element={<EditEmployeeFrom />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/editfeedback" element={<FeedbackEdit />} />
      </Route>
    </>
  )
);

function Routercomponent() {
  return <RouterProvider router={router} />;
}

export default Routercomponent;
