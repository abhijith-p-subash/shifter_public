import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import FooterBar from '../components/common/FooterBar';


const DefaultLayout: React.FC = () => {
  return (
    <div>
      <header>
      
       <Header/>
      </header>
      <main>
        <div >
        <Outlet /> {/* This will render the matched child route */}
        </div>
      </main>

      <footer>
        <FooterBar />
      </footer>
    </div>
  );
};

export default DefaultLayout;
