import React from 'react';
import Layout from '../../../Components/Dashboard/Layout';
import PasswordReset from '../../../Components/Common/PasswordReset';

function AdminPasswordChangePage() {
  return ( 
    <Layout>
      <div className='bg-gray-200 min-h-[100vh] p-4'>
        <div className="p-8 flex flex-col blog-header">
          <h1>Change Password</h1>
        </div>
        <div className='mt-8 flex justify-center'>
          <PasswordReset />
        </div>
      </div>
    </Layout>
  );
}

export default AdminPasswordChangePage;