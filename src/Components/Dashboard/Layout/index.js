import React, { useState } from "react";
import LeftSidebar from "../LeftSidebar";
import TopSection from "../TopSection";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex justify-start overflow-hidden">
      <LeftSidebar isOpen={isSidebarOpen} />
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
