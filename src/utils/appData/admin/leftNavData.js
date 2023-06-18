import React from 'react'
import { BiUserCircle } from 'react-icons/bi';
import {
  BsBarChartFill,
  BsCalendar2Event,
  BsChatDots,
  BsFileLock2,
  BsFillHeartFill,
  BsPencilSquare,
  BsGear
} from "react-icons/bs";
import { FaUserShield } from 'react-icons/fa';



export const userLinks = [
  {
    id: "users",
    name: "Managing Users",
    route: "/admin/users",
    icon: <BsGear size={20} className="mr-2" />,
  },
]

export const blogLinks = [
  {
    id: "blogs",
    name: "Blogs",
    route: "/admin/blogs",
    icon: <BsPencilSquare size={20} className="mr-2" />,
  },
  {
    id: "polls",
    name: "Polls",
    route: "/admin/polls",
    icon: <BsBarChartFill size={20} className="mr-2" />,
  },
  {
    id: "events",
    name: "Events",
    route: "/admin/events",
    icon: <BsCalendar2Event size={20} className="mr-2" />,
  },
  {
    id: "forums",
    name: "Forums",
    route: "/admin/forums",
    icon: <BsChatDots size={20} className="mr-2" />,
  },
  {
    id: "donations",
    name: "Donations",
    route: "/admin/donations",
    icon: <BsFillHeartFill size={20} className="mr-2" />,
  },
  {
    id: "documentVault",
    name: "Document Vault",
    route: "/admin/document-vault",
    icon: <BsFileLock2 size={20} className="mr-2" />,
  },
];

export const roleLinks = [
  {
    id: "managing-roles",
    name: "Managing Roles",
    route: "/admin/user-roles",
    icon: <BiUserCircle size={20} className="mr-2" />,
  },
  {
    id: "assigning-roles",
    name: "Assigning Roles",
    route: "/admin/assign-roles",
    icon: <FaUserShield size={20} className="mr-2" />,
  }
]