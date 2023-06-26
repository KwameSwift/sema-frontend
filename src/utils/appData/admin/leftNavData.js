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
import { FaEdit } from 'react-icons/fa';
import { FiLock, FiLogOut } from 'react-icons/fi';



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
    name: "Documents Vault",
    route: "/admin/document-vault",
    icon: <BsFileLock2 size={20} className="mr-2" />,
  },
];

export const creatorBlogLinks = [
  {
    id: "blogs",
    name: "Blogs",
    route: "/creator/blogs",
    icon: <BsPencilSquare size={20} className="mr-2" />,
  },
  {
    id: "polls",
    name: "Polls",
    route: "/creator/polls",
    icon: <BsBarChartFill size={20} className="mr-2" />,
  },
  {
    id: "events",
    name: "Events",
    route: "/creator/events",
    icon: <BsCalendar2Event size={20} className="mr-2" />,
  },
  {
    id: "forums",
    name: "Forums",
    route: "/creator/forums",
    icon: <BsChatDots size={20} className="mr-2" />,
  },
  {
    id: "donations",
    name: "Donations",
    route: "/creator/donations",
    icon: <BsFillHeartFill size={20} className="mr-2" />,
  },
  {
    id: "documentVault",
    name: "Documents Vault",
    route: "/creator/document-vault",
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
]

export const profileLinks = [
  {
    id: "update-profile",
    name: "Update Profile",
    route: "/admin/profile",
    icon: <FaEdit size={20} className="mr-2" />,
  },
  {
    id: "change-password",
    name: "Change Password",
    route: "/admin/change-password",
    icon: <FiLock size={20} className="mr-2" />,
  },
  {
    id: "logout",
    name: "Logout",
    route: "/admin/logout",
    icon: <FiLogOut size={20} className="mr-2" />,
  },
]

export const creatorProfileLinks = [
  {
    id: "update-profile",
    name: "Update Profile",
    route: "/creator/profile",
    icon: <FaEdit size={20} className="mr-2" />,
  },
  {
    id: "change-password",
    name: "Change Password",
    route: "/creator/change-password",
    icon: <FiLock size={20} className="mr-2" />,
  },
  {
    id: "logout",
    name: "Logout",
    route: "/creator/logout",
    icon: <FiLogOut size={20} className="mr-2" />,
  },
]