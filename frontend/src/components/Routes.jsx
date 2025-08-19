import { useEffect } from 'react';
import React from 'react';
import {useNavigate, useRoute} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard.jsx';
import Signup from './auth/Signup.jsx';
import Login from './auth/Login.jsx';
import Profile from './user/Profile.jsx';
import {useAuth} from '../authContext.jsx';

const ProjectRoutes=()=>{
const {currentUser, setcurrentUser} = useAuth(); // Access authentication context
const navigate = useNavigate(); // Hook to programmatically navigate
useEffect(() => {
  const userIdFromStorage= localStorage.getItem('userId'); // Get userId from localStorage
  if (userIdFromStorage && !currentUser) {
    setcurrentUser(userIdFromStorage);// Set currentUser state if userId exists

  }
  if(!userIdFromStorage && !["/auth","/signup"].includes(window.location.pathname)){
    navigate('/auth'); // Redirect to auth page if userId does not exist and not already
  }
  if(userIdFromStorage && window.location.pathname === '/auth'){
    navigate('/dashboard'); // Redirect to dashboard if userId exists and on auth page
  } 
},[currentUser,navigate,setcurrentUser]);
let element=useRoute([
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: "/auth",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/profile",
    element: <Profile/>
  }
]);
return element;
}
export default ProjectRoutes;
// This component handles the routing logic based on authentication state
