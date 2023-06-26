import React, { useEffect, useState } from 'react';
import Avatar from "../../../Assets/images/person-img.png";
import ContentCreatorLayout from '../../../Components/ContentCreator/Layout';

import "./style.scss";
import { axiosClient } from '../../../libs/axiosClient';

function CreatorProfilePage() {
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState({});

  const getCountries = async () => {
    try {
      const response = await axiosClient.get("utilities/dropdowns/2/");
      const data = response.data.data;
      setCountries(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    getCountries();
  }, []);
  return ( 
    <ContentCreatorLayout header="Profile">
      <div className='profile flex justify-center'>
        <div className='bg-[#fff] w-[55%] p-4 mt-5'>
          <div className='flex items-center justify-between'>
            <h1>Edit Profile</h1>
            <span><img src={Avatar} className='w-[100px] h-[100px]' /></span>
          </div>
          <div className='flex w-full flex-wrap mt-8'>
            <div className='flex m-2 w-[40%] flex-col'>
              <label>First Name</label>
              <input type="text" placeholder="First Name" className='border p-2'/>
            </div>
            <div className='flex m-2 w-[40%] flex-col'>
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" className='border p-2'/>
            </div>
          </div>
          <div className='flex w-full flex-wrap mt-8'>
            <div className='flex w-[40%] flex-col m-2'>
              <label>Email Address</label>
              <input type="email" placeholder="Email" className='border p-2'/>
            </div>
            <div className="flex m-2 w-[40%] flex-col">
              <label>Country</label>
              <select
                onChange={handleChange}
                className="mt-2 border p-2"              
                name="country_id"
              >
                <option>Select country</option>
                {countries?.map((elt) => (
                  <option value={elt.id} key={elt.id}>
                    {elt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex w-full flex-wrap mt-8'>
            <div className='flex w-[40%] m-2 flex-col'>
              <label>Mobile Number</label>
              <input type="tel" placeholder="Enter mobile number" className='border p-2'/>
            </div>
            <div className='flex w-[40%] m-2 flex-col'>
              <label>Organization</label>
              <input type="text" placeholder="Enter organization" className='border p-2'/>
            </div>
          </div>
          <div className='flex mx-2 w-full flex-col mt-8'>
            <label>Bio</label>
            <textarea placeholder='Write here...' rows={3} className='border p-2'/>
          </div>
          <div className="mt-3 flex justify-center">
            <button className="profile-save py-2 px-4 text-[#fff]">Save</button>
          </div>
        </div>
      </div>

    </ContentCreatorLayout>
  );
}

export default CreatorProfilePage;