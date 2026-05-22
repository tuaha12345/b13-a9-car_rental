import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Suspense } from 'react';
import {Spinner} from "@heroui/react";


const MainLayout = ({ children }) => {
    return (
        <>
        <Suspense fallback={      <div className="flex flex-col items-center gap-2">
        <Spinner color="warning" />
        <span className="text-xs text-danger">Warning</span>
      </div>}>
            <Navbar />
        </Suspense>
        {children}
        <Footer></Footer>
        </>
    );
};

export default MainLayout;