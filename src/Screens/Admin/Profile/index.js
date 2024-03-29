import React from 'react'
import Layout from '../../../Components/Dashboard/Layout';
import Profile from '../../../Components/Common/Profile';
import {useTranslation} from "react-i18next";

function AdminProfilePage() {
    const {t} = useTranslation();
    return (
        <Layout>
            <div className='bg-gray-200 p-4'>
                <div className="p-8 flex flex-col blog-header">
                    <h1>{t('admin.profile')}</h1>
                </div>
                <div className='mt-8'>
                    <Profile/>
                </div>
            </div>
        </Layout>
    );
}

export default AdminProfilePage;
