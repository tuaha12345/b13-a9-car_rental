"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Link from 'next/link';


const ProfileCard = ({ user }) => {
    console.log("user name from profile", user);
    const [name, setName] = useState(user.name);
    const [imageUrl, setImageUrl] = useState(user.image);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <>
            <div className="relative w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
    
                <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-2xl"></div>
        
                <div className="relative pt-12 flex justify-center">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 p-1 shadow-lg">
                            <Image
                                src={imageUrl}
                                alt="Profile Picture"
                                width={120}
                                height={120}
                                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-700"
                                priority
                            />
                        </div>
                    </div>
                </div>

                
                <div className="text-center px-6 pb-8 pt-4">
                    <div className="mb-4">
                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            Full Name
                        </p>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            {name}
                        </h2>
                    </div>
                    
                    <div className="mb-6">
                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            Email Address
                        </p>
                        <p className="text-base text-gray-600 dark:text-gray-300 break-all">
                            {user.email}
                        </p>
                    </div>

                   {/* dashboard redirect */}
                   <div className="flex justify-center">
                        <Link href="/" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-md transition-all duration-200 transform hover:scale-105">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProfileCard;