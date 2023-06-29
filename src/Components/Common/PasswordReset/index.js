import React, { useState } from 'react'

function PasswordReset() {
  const [loading, ] = useState(false);
  return ( 
    <div className='bg-[#fff]'>
      <h1>New Password</h1>
      <input type='text' />
      <input type='text' />
      <input type='text' />
      <div className="mt-3 flex justify-center">
        <button
          className="profile-save py-2 px-4 text-[#fff]"
        >
          { loading ? "Loading..." : "Save" }
        </button>
      </div>
    </div>
  );
}

export default PasswordReset;