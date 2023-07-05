import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import Avatar from "../../../../../Assets/images/no-profile-img.webp";
import "./style.scss";

function AdminPollCard() {
  const dropItems = [
    {id: "status", name: "Approve", action: ""},
    {id: "edit", name: "Edit", action: ""}
  ]
  return ( 
    <div className='poll-card p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <img src={Avatar} className='w-[30px] h-[30px] rounded-full' />
          <span className='flex flex-col ml-3'>
            <span>John Doe</span>
            <span className='text-[13px]'>12th January, 2022</span>
          </span>
        </div>
        <Dropdown>
          <Dropdown.Toggle className='border-0'><BsThreeDotsVertical fill='#000' size={20} /></Dropdown.Toggle>
          <Dropdown.Menu>
            {dropItems.map((elt) => 
              <Dropdown.Item key={elt.id}>{elt.name}</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='mt-4'>
        <h3 className='font-bold text-[20px]'>What five Marvel characters do you choose to ensure your safety?</h3>
        <p className='mt-4 poll-desc'>The entire DC Universe is out to assassinate you. What five Marvel characters do you choose to ensure your safety and why? The entire DC Universe? OK, I’m going to need some heavy hitters here.</p>
      </div>
      <hr className='mt-3'/>
      <div className='flex mt-3 items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-[13px]'>Approved: 12th January, 2022</span>
          <span className='text-[13px]'>By: John Doe</span>
        </div>
        <div>
          <span>4 Choices</span>
        </div>
      </div>
    </div>
  );
}

export default AdminPollCard;