import Login from "./Components/Login/Login";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const role = localStorage.getItem("role");
console.log(role);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/" element={<Login />} />
      </Route>
    </>
  )
);
