import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ChatbotProvider } from './context/ChatbotContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CampusMapPage from './pages/CampusMapPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AcademicsPage from './pages/dashboard/AcademicsPage';
import HostelPage from './pages/dashboard/HostelPage';
import MarketplacePage from './pages/dashboard/MarketplacePage';
import ArtShowcasePage from './pages/dashboard/ArtShowcasePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected route component
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ChatbotProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="map" element={<CampusMapPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            
            {/* Protected dashboard routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="academics" element={<AcademicsPage />} />
              <Route path="hostel" element={<HostelPage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="art-showcase" element={<ArtShowcasePage />} />
            </Route>
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ChatbotProvider>
    </AuthProvider>
  );
}

export default App;