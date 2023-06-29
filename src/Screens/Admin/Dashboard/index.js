import React, { useEffect, useState } from 'react'
import Layout from '../../../Components/Dashboard/Layout';
import DashboardSummaryCards from './components/Card';
import { axiosClientWithHeaders } from '../../../libs/axiosClient';
// import CustomTable from "../../../Components/Common/CustomTable";

import "./style.scss";


function DashboardPage() {
  const [users, setUsers] = useState(0);
  const [blogsPolls, setBlogsPolls] = useState(0);
  const [eventsForums, setEventsForums] = useState(0);
  const [donations, setDonations] = useState(0);


  const data = [
    {
      cardFill: "#001253",
      icon: "BsPeople",
      title: "Users",
      count: users
    },
    {
      cardFill: "#FC8A2B",
      icon: "BsBarChartFill",
      title: "Blogs & Polls",
      count: blogsPolls,
    },
    {
      cardFill: "#FC8A2B",
      icon: "BsCalendar2Event" ,
      title: "Events & Forums",
      count: eventsForums,
    },
    {
      cardFill: "#3e6d9c",
      icon: "BsFillHeartFill" ,
      title: "Donations",
      count: donations,
    },
  ]

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const resp = await axiosClientWithHeaders.get('super-admin/system-statistics/');
        const data = resp.data.data;
        console.log(data);
        setUsers(data.total_users);
        setBlogsPolls(data.total_blogs_and_polls);
        setEventsForums(data.total_events_and_forums);
        setDonations(data.total_donations);
      } catch (err) {
        console.log(err);
      }
    }
    getAllUsers();
  }, []);

  return ( 
    <Layout>
      <div className='dashboard-main'>
        <div className="p-8 mt-3 mx-3 flex flex-col blog-header">
          <h1>Home</h1>
        </div>
        <div className='summary mt-8 mx-5'>
          {data.map((elt, index) => 
            <DashboardSummaryCards 
              { ...elt }
              key={index}
            />
          )}
        </div>

        {/* <div className='second-row flex justify-between mx-5'>
          <div className='mt-8 w-full'>
            <CustomTable />
          </div>
          <div className='mt-8 w-full'>
            <CustomTable />
          </div>
        </div> */}
      </div>
    </Layout>
  );
}

export default DashboardPage;