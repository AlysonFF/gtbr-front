import './App.css';
import {Login} from "./pages/login/Login";
import 'bootstrap/dist/css/bootstrap.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RequireAuth} from "./security/RequireAuth";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Setup} from "./pages/setup/Setup";

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
    path:'/setup',
    element: <Setup></Setup>
  },
  {
    path:'/dashboard',
    element:  <RequireAuth element={<Dashboard/>}></RequireAuth>
  }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
