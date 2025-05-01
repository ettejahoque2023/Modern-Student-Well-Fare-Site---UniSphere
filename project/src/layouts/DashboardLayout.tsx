import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import DashboardHeader from '../components/navigation/DashboardHeader';
import Chatbot from '../components/chatbot/Chatbot';
import { useAuth } from '../context/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600">
              {user?.department} | Student ID: {user?.studentId}
            </p>
          </div>
          
          <div className="pb-12">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default DashboardLayout;