import React from 'react';
import { Outlet } from 'react-router-dom';



const DashboardLayout: React.FC = () => {
  return (
    <div>
 
      <main>
        <div >
        <Outlet /> {/* This will render the matched child route */}
        </div>
      </main>

      
    </div>
  );
};

export default DashboardLayout;
