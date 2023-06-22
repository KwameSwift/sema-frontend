import React, { useEffect, useState } from "react";
import LeftSidebar from "../LeftSidebar";
import TopSection from "../TopSection";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user?.tokens?.access) {
      toast.error("Unauthorized to access this page");
      navigate("/login");
    }
  }, [user])

  return (
    <div className="flex justify-start overflow-hidden">
      <LeftSidebar isOpen={isSidebarOpen} user={user} />
      <div className={isSidebarOpen ? "w-[83%]": "w-[100%]"}>
        <TopSection 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
        <>{children}</>
      </div>
    </div>
  );
}

export default Layout;
