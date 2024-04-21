import AddEmployeeForm from "./Components/Admin Employees/AddEmployeeForm";
import EditEmployeeFrom from "./Components/Admin Employees/EditEmployeeFrom";
import EmployeesTable from "./Components/Admin Employees/EmployeesTable";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Feedback from "./Components/Admin Employees/Feedback";
import FeedbackEdit from "./Components/Admin Employees/FeedbackEdit";
import EmployeesDashboard from "./Components/Employees/EmployeesDashboard";
import PerformaceReviewTableList from "./Components/Employees/PerformaceReviewTableList";
import AssignPerfoanceReview from "./Components/Admin Employees/AssignPerfoanceReview";
import EmployeesReviewFrom from "./Components/Employees/EmployeesReviewFrom";

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

        <Route path="/employeesdashboard" element={<EmployeesDashboard />} />
        <Route
          path="/perfromacereviewlist"
          element={<PerformaceReviewTableList />}
        />
        <Route path="/assignreview" element={<AssignPerfoanceReview />} />
        <Route
          path="/employeeaddreview/:id"
          element={<EmployeesReviewFrom />}
        />
      </Route>
    </>
  )
);

function Routercomponent() {
  return <RouterProvider router={router} />;
}

export default Routercomponent;
