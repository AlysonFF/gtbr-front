import './App.css';
import {Login} from "./pages/login/Login";
import 'bootstrap/dist/css/bootstrap.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Dashboard} from "./pages/dashboard/Dashboard";

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Login></Login>
  },
  {
    path:'/:applicationId',
    element: <Login></Login>
  },
  {
    path:'/dashboard',
    element: <Dashboard></Dashboard>
  }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
