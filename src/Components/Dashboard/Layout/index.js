import React, { useEffect, useState } from "react";
import LeftSidebar from "../LeftSidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user?.tokens?.access || !user.user.is_admin) {
      navigate("/login");
    }
  }, [user])

  return (
    <div className="flex h-full justify-start overflow-hidden">
      <LeftSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} user={user} />
      <div className={`creator-content p-0 h-[100vh] overflow-auto w-full ${isSidebarOpen ? "w-[83%]": "w-[100%]"}`}>
        <>{children}</>
      </div>
    </div>
  );
}

export default Layout;
