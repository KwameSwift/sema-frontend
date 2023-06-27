import React from 'react';
import ContentCreatorLayout from '../../../Components/ContentCreator/Layout';
import Profile from '../../../Components/Common/Profile';


import "./style.scss";

function CreatorProfilePage() {

  return ( 
    <ContentCreatorLayout header="Profile">
      <Profile />
    </ContentCreatorLayout>
  );
}

export default CreatorProfilePage;