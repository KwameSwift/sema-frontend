import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../Assets/images/person-img.png";
import { axiosClient } from "../../../libs/axiosClient";
import "./style.scss";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

function Profile() {
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState({});
  const [, setProfileImageFile] = useState(null);
  const [profileImageFileUrl, setProfileImageFileUrl] = useState("");

  const fileRef = useRef(null);

  const getCountries = async () => {
    try {
      const response = await axiosClient.get("utilities/dropdowns/2/");
      const data = response.data.data;
      setCountries(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetImage = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setProfileImageFileUrl(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const clearFile = () => {
    fileRef.current.value = null;
    setProfileImageFile(null);
    setProfileImageFileUrl("");
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="profile flex justify-center">
      <div className="bg-[#fff] w-[55%] p-4 mt-5">
        <div className="flex items-center justify-between">
          <h1>Edit Profile</h1>
          <div className="flex">
            <span>
              <img src={Avatar} className="w-[120px] h-[120px]" />
            </span>
            {profileImageFileUrl
            ? <span className="ml-[-30px] cursor-pointer flex items-end">
                <BsTrash size={25} fill="red" onClick={clearFile} />
              </span>
            : <span className="ml-[-30px] cursor-pointer flex items-end">
                <BiEdit size={25} onClick={() => fileRef.current.click()} />
              </span>
            }
          </div>
        </div>
        <input onChange={handleSetImage} ref={fileRef} type="file" hidden />
        <div className="flex w-full flex-wrap mt-8">
          <div className="flex m-2 w-[40%] flex-col">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="border p-2"
            />
          </div>
          <div className="flex m-2 w-[40%] flex-col">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" className="border p-2" />
          </div>
        </div>
        <div className="flex w-full flex-wrap mt-8">
          <div className="flex w-[40%] flex-col m-2">
            <label>Email Address</label>
            <input type="email" placeholder="Email" className="border p-2" />
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
        <div className="flex w-full flex-wrap mt-8">
          <div className="flex w-[40%] m-2 flex-col">
            <label>Mobile Number </label>
            <input
              type="tel"
              placeholder="Enter mobile number"
              className="border p-2"
            />
          </div>
          <div className="flex w-[40%] m-2 flex-col">
            <label>Organization</label>
            <input
              type="text"
              placeholder="Enter organization"
              className="border p-2"
            />
          </div>
        </div>
        <div className="flex mx-2 w-full flex-col mt-8">
          <label>Bio</label>
          <textarea
            placeholder="Write here..."
            rows={3}
            className="border p-2"
          />
        </div>
        <div className="flex mx-2 w-full flex-col mt-8">
          <label>
            Links <span className="text-[#8d8c8c]">(comma separated)</span>
          </label>
          <textarea
            placeholder="eg: https://google.com, https://youtube.com"
            rows={3}
            className="border p-2"
          />
        </div>
        <div className="mt-3 flex justify-center">
          <button className="profile-save py-2 px-4 text-[#fff]">Save</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
