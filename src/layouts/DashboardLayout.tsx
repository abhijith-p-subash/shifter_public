import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Sidebar } from "flowbite-react";
import {
  HiChartPie,
} from "react-icons/hi";
import { IoReceiptSharp, IoLogOutOutline } from "react-icons/io5";
import { RiMenu2Fill, RiMenu3Fill } from "react-icons/ri";

import { Drawer } from "flowbite-react";
import { HiBars2 } from "react-icons/hi2";
import { FaShareAlt } from "react-icons/fa";


const navLinks = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: HiChartPie,
  },
  {
    title: "Quotes",
    url: "quotes",
    icon: IoReceiptSharp,
  },
  // {
  //   title: "Shift Request",
  //   url: "shift-request",
  //   icon: HiShoppingBag,
  // },
  {
    title: "Share",
    url: "share",
    icon: FaShareAlt,
  },
];

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { pathname } = location;
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Remove token from localStorage and sessionStorage
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="h-screen flex bg-gray-400 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`${
              isSidebarOpen ? "w-64" : "w-0"
            } bg-white border-r shadow-md transition-all duration-300 flex flex-col`}
          >
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
              <div className="flex  flex-col justify-between py-4">
                {/* Search Bar (Visible on Small Screens) */}
                <div className="  p-4 mb-6 rounded-lg shadow-lg">
                  <Link to={"/dashboard"}>
                    <h1 className="text-darkBlue-500 text-xl font-semibold text-center ">
                      Shifter
                    </h1>
                  </Link>
                </div>
                {/* Sidebar Items */}
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    {navLinks.map((link, index) => (
                      <Link to={link.url}>
                        <Sidebar.Item
                          active={pathname.includes(link.url)}
                          icon={link.icon}
                          key={index}
                        >
                          {link.title}
                        </Sidebar.Item>
                      </Link>
                    ))}
                  </Sidebar.ItemGroup>
                  {/* <Sidebar.ItemGroup>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={HiClipboard}
                    >
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                    >
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={HiInformationCircle}
                    >
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup> */}
                </Sidebar.Items>
              </div>
            </Sidebar>
            {/* Toggle Sidebar Button */}
            {/* <div className="px-4 py-2 border-t">
          <Button
            onClick={handleLogout}
            color="light"
            size="sm"
            className="w-full"
            aria-label="Toggle Sidebar"
          >
            Logout
          </Button>
        </div> */}
          </aside>

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col">
            {/* Header */}
            <header className="h-16 w-full bg-gray-50 flex justify-between items-center px-4 shadow-md gap-4">
              <div className="flex items-center gap-4">
                <button className="p-0 m-0" onClick={toggleSidebar}>
                  {isSidebarOpen ? (
                    <RiMenu2Fill className="text-darkBlue-500 w-6 h-6" />
                  ) : (
                    <RiMenu3Fill className="text-darkBlue-500 w-6 h-6" />
                  )}
                </button>
                {/* <Link to={"/dashboard"}>
              <h1 className="text-white text-lg font-semibold ">Shifter</h1>
            </Link> */}
              </div>
              <div>
                <Button
                  onClick={handleLogout}
                  color="red"
                  size="sm"
                  className="w-full"
                  aria-label="Toggle Sidebar"
                >
                  Logout
                  <IoLogOutOutline className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto overflow bg-gray-200 ">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="h-screen flex bg-gray-400 overflow-hidden">
          <main className="flex-1 overflow-y-auto overflow-x-auto bg-gray-200 ">
            
            <Outlet />
          </main>

          <Drawer
            edge
            open={isOpen}
            onClose={handleClose}
            position="bottom"
            className="p-0"
          >
            <Drawer.Header
              closeIcon={HiBars2}
              title=""
              titleIcon={RiMenu3Fill}
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer px-4 pt-4 hover:bg-gray-50 dark:hover:bg-gray-700"
            />
            <Drawer.Items className="p-4">
              <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-4">
                {navLinks.map((link, index) => (
                  <Link to={link.url} key={index}>
                    <div className="cursor-pointer rounded-lg bg-gray-50 p-4 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                      <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600">
                        
                        <link.icon className="text-gray-500 dark:text-gray-400 h-6 w-6" />
                      </div>
                      <div className="text-center font-medium text-gray-500 dark:text-gray-400  text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                        {link.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Drawer.Items>
            <Drawer.Items className="p-4"  onClick={handleLogout}>
              <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-4">
             
                    <div className="cursor-pointer rounded-lg bg-red-50 p-4 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                      <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-red-500 p-2 dark:bg-gray-600">
                        
                        <IoLogOutOutline className="text-white dark:text-red-400 h-6 w-6" />
                      </div>
                      <div className="text-center font-medium text-red-500 dark:text-red-400  text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                        LogOut
                      </div>
                    </div>
                
              </div>
            </Drawer.Items>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
