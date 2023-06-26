import React, { useEffect, useState } from "react";
import Avatar from "../../../Assets/images/person-img.png";
import { BsTrash } from "react-icons/bs";
import { axiosClient } from "../../../libs/axiosClient";
import "./style.scss";

function Profile() {
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
    <div className="profile w-full flex flex-wrap justify-center">
      <div className="bg-[#fff] w-full m-3 mt-0 profile-card p-4">
        <div>
          <h3 className="text-[22px] font-bold">Profile Picture</h3>
          <div className="mt-5 flex items-center">
            <img src={Avatar} alt="" />
            <div className="flex ml-8 flex-col items-center">
              <button className="p-2 border-lg mb-3 text-[#fff] bg-[#001253]">
                Change Profile
              </button>
              <button className="flex p-2 w-full flex justify-center items-center border">
                <BsTrash className="text-[#001253] mr-2" fill="red" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-bold text-[22px]">Basic Information</h3>
          <div className="flex mt-3 flex-col">
            <label>First Name</label>
            <input
              type="text"
              placeholder="eg: John"
              className="mt-2 border p-2"
            />
          </div>
          <div className="flex mt-3 flex-col">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="eg: Doe"
              className="mt-2 border p-2"
            />
          </div>
          <div className="flex mt-3 flex-col">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="eg: example@gmail.com"
              className="mt-2 border p-2"
            />
          </div>
          <div className="mt-3 flex justify-center">
            <button className="profile-save py-2 px-4 text-[#fff]">Save</button>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] w-full m-3 mt-0 profile-card p-4">
        <h3 className="font-bold text-[22px]">Profile Information</h3>
        <div className="mt-8 ">
          <div className="flex mt-3 flex-col">
            <label>Bio</label>
            <textarea
              rows={3}
              placeholder="Write here..."
              className="border mt-2 p-2"
            />
          </div>
          <div className="flex mt-3 flex-col">
            <label>Mobile Number</label>
            <input type="text" placeholder="+XXX XXX XXXX" className="mt-2 border p-2" />
          </div>
          <div className="flex mt-3 flex-col">
            <label>Organization</label>
            <input type="text" placeholder="Enter organization" className="mt-2 border p-2" />
          </div>
          <div className="flex mt-3 flex-col">
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
          <div className="flex mt-3 flex-col">
            <label>Links <span className="text-[14px] text-[#A0AEC0]">(comma separated links)</span></label>
            <textarea
              rows={3}
              className="border mt-2 p-2"
              placeholder="eg: https://example.com, https://example.com"
            />
          </div>
          <div className="mt-3 flex justify-center">
            <button className="profile-save py-2 px-4 text-[#fff]">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
