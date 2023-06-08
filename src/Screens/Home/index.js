import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUserData } from '../../Redux/slices/userSlice';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const logout = () => {
    dispatch(resetUserData());
    navigate('/login');
  }

  const handleProceed = () => {
    if (user?.tokens?.access) logout();
    else navigate('/login');
  }

  return ( 
    <div>
      <h1>Hello welcome to the HomePage</h1>
      <button type='button' onClick={handleProceed}>
        {user?.tokens?.access ? "Logout" : "Login" }
      </button>
    </div>
  );
}

export default HomePage;