import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';



const MainLayout = ({ children }) => {
    return (
        <>
        <Navbar />
        {children}
        <Footer></Footer>
        </>
    );
};

export default MainLayout;