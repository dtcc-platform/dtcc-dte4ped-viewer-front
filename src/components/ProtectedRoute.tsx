'use client'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Head from "next/head";
import { ACCESS_TOKEN } from "@/constants";
import logo from '../../public/dtcc-logo.png'
import Image from "next/image";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { logout, isAuthorized, loading } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      logout()
      router.push('/login');
    }
  };

  useEffect(() => {
    if (isAuthorized === false) {
      router.push("/login");
    }
  }, [isAuthorized, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>DTE Digital Twin Energy</title>
        <meta
          name="description"
          content="DTE Digital Twin Energy project by Chalmers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       {(<div className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="flex items-center px-4 py-3">
            <div className="flex items-center mr-8">
              <div className="w-32 h-12 mt-3">
              <Image src={logo} alt="test"/>
              </div>
              {/* <div className="ml-2 text-xl text-gray-500">
                Digital Twin Energy
              </div> */}
            </div>
            {
              <div className="flex items-center ml-auto space-x-4">
                {/* <div className="text-gray-600 cursor-pointer">
                  {userInfo.userName}
                </div> */}
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="px-2 font-semibold text-gray-700 bg-white border border-gray-500 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            }
          </div>
        </div>)}
      {children}
    </div>
    
  )
};

export default ProtectedRoute;
