import React, { useState } from "react";
import LeftSidebar from "../LeftSidebar";
import TopSection from "../TopSection";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex justify-between">
      <LeftSidebar isOpen={isSidebarOpen} />
      <div className="w-full">
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
