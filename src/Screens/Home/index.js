import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUserData } from '../../Redux/slices/userSlice';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetUserData());
    navigate('/login');
  }
  return ( 
    <div>
      <h1>Hello welcome to the HomePage</h1>
      <button type='button' onClick={logout}>
        Click me!
      </button>
    </div>
  );
}

export default HomePage;