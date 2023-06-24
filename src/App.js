import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RequireAuth} from "./security/RequireAuth";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Setup} from "./pages/setup/Setup";
import {Login} from "./pages/login/Login";
import 'react-notifications/lib/notifications.css';


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
