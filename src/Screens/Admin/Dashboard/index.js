import React from 'react'
import Layout from '../../../Components/Dashboard/Layout';
import DashboardSummaryCards from './components/Card';

import "./style.scss";


function DashboardPage() {
  // const [users, setUsers] = useState(0);

  const data = [
    {
      cardFill: "#001253",
      icon: "BsPeople",
      title: "Users",
      count: "0"
    },
    {
      cardFill: "#FC8A2B",
      icon: "BsPencilSquare",
      title: "Blogs",
      count: "0",
    },
    {
      cardFill: "#FC8A2B",
      icon: "BsPeople" ,
      title: "Polls",
      count: "0",
    },
    {
      cardFill: "#3e6d9c",
      icon: "BsPeople" ,
      title: "Donations",
      count: "0",
    },
  ]

  return ( 
    <Layout>
      <div className='mt-8 dashboard-main'>
        <div className='summary mx-5'>
          {data.map((elt, index) => 
            <DashboardSummaryCards 
              { ...elt }
              key={index}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;