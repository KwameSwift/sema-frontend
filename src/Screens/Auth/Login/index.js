import React from 'react';
import AuthSidebar from '../../../Components/Auth/Sidebar';

import "../style.scss";

function LoginPage() {
  return ( 
    <div className='auth-login'>
      <AuthSidebar />
      <div className='login-content'></div>
    </div>
  );
}

export default LoginPage;