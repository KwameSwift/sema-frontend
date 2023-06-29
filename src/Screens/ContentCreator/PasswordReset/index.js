import React from 'react';
import ContentCreatorLayout from '../../../Components/ContentCreator/Layout';
import PasswordReset from '../../../Components/Common/PasswordReset';
import "./style.scss";

function CreatorPasswordChangePage() {

  return ( 
    <ContentCreatorLayout header="Profile">
      <div className='mt-4 flex justify-center'>
        <PasswordReset />
      </div>
    </ContentCreatorLayout>
  );
}

export default CreatorPasswordChangePage;