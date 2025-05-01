import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Calendar, Users, Home, ShoppingBag, PaintBucket, Bell, BarChart3 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  const upcomingEvents = [
    { id: 1, title: 'Mid-semester Exams Begin', date: '2025-03-15', type: 'exam' },
    { id: 2, title: 'Cultural Festival', date: '2025-02-28', type: 'event' },
    { id: 3, title: 'Science Symposium', date: '2025-03-05', type: 'academic' },
    { id: 4, title: 'Assignment Deadline: Data Structures', date: '2025-02-20', type: 'assignment' },
  ];
  
  const announcements = [
    { id: 1, title: 'Library Hours Extended During Exam Period', date: '2025-02-10', priority: 'medium' },
    { id: 2, title: 'Campus Wi-Fi Maintenance Schedule', date: '2025-02-12', priority: 'low' },
    { id: 3, title: 'New Scholarship Opportunities Available', date: '2025-02-15', priority: 'high' },
  ];
  
  const courses = [
    { id: 1, code: 'CS301', name: 'Data Structures and Algorithms', progress: 65 },
    { id: 2, code: 'CS310', name: 'Database Management Systems', progress: 78 },
    { id: 3, code: 'CS350', name: 'Computer Networks', progress: 42 },
    { id: 4, code: 'MA201', name: 'Discrete Mathematics', progress: 90 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-purple-100 text-purple-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { icon: <BookOpen />, label: 'Academics', path: '/dashboard/academics', color: 'bg-blue-500' },
            { icon: <Home />, label: 'Hostel', path: '/dashboard/hostel', color: 'bg-green-500' },
            { icon: <ShoppingBag />, label: 'Marketplace', path: '/dashboard/marketplace', color: 'bg-purple-500' },
            { icon: <PaintBucket />, label: 'Art Showcase', path: '/dashboard/art-showcase', color: 'bg-pink-500' },
            { icon: <Bell />, label: 'Notifications', path: '#', color: 'bg-amber-500' },
            { icon: <Calendar />, label: 'Calendar', path: '#', color: 'bg-red-500' },
          ].map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link to={action.path}>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-white mb-2`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <Button variant="link" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <Calendar size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {event.title}
                  </p>
                  <div className="flex items-center mt-1">
                    <Clock size={14} className="text-gray-400 mr-1" />
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Announcements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Announcements</h2>
            <Button variant="link" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="font-medium text-gray-900">
                  {announcement.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-500">
                    {new Date(announcement.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </p>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Attendance Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Attendance Summary</h2>
            <Button variant="link" size="sm">Details</Button>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-blue-100 text-blue-600">
              82%
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Overall Attendance</p>
              <p className="text-xs text-gray-500 mt-1">Last updated: Today</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-700">{course.code}: {course.name}</p>
                  <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${
                      course.progress >= 75 ? 'bg-green-500' : 
                      course.progress >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Current Academic Status */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Current Academic Status</h2>
          <Button variant="outline" size="sm">Download Report</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Semester</p>
                <p className="text-lg font-semibold text-gray-900">Spring 2025</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Program</p>
                <p className="text-lg font-semibold text-gray-900">{user?.department || 'Computer Science'}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current CGPA</p>
                <p className="text-lg font-semibold text-gray-900">3.7/4.0</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default DashboardPage;