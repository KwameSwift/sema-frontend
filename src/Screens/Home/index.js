import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUserData } from '../../Redux/slices/userSlice';
import Navbar from '../../Components/Common/Navbar';

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
      <Navbar />
      <span onClick={handleProceed}></span>
    </div>
    

  );
}

export default HomePage;