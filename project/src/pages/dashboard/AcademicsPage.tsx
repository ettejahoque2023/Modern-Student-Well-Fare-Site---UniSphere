import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Calendar, Clock, CheckCircle, AlertCircle, Download, FileText, 
  BarChart3, PieChart, TrendingUp, FilePlus, Bell, ArrowRight 
} from 'lucide-react';
import { Button } from '../../components/common/Button';

type CourseType = {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  department: string;
  schedule: {
    days: string[];
    time: string;
    location: string;
  };
  progress: number;
  attendance: number;
  assignments: {
    total: number;
    completed: number;
    upcoming: {
      title: string;
      dueDate: string;
    }[];
  };
  grades: {
    midterm?: number;
    assignments: number;
    participation: number;
    currentGrade?: number;
  };
};

const AcademicsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'timetable' | 'grades' | 'exams'>('courses');
  
  const courses: CourseType[] = [
    {
      id: '001',
      code: 'CS301',
      name: 'Data Structures and Algorithms',
      credits: 4,
      instructor: 'Dr. Jennifer Wilson',
      department: 'Computer Science',
      schedule: {
        days: ['Mon', 'Wed'],
        time: '10:00 AM - 11:30 AM',
        location: 'Building 3, Room 405'
      },
      progress: 65,
      attendance: 92,
      assignments: {
        total: 8,
        completed: 5,
        upcoming: [
          { title: 'Algorithm Analysis Report', dueDate: '2025-03-15' },
          { title: 'Graph Algorithms Implementation', dueDate: '2025-03-25' }
        ]
      },
      grades: {
        midterm: 87,
        assignments: 92,
        participation: 95,
        currentGrade: 91
      }
    },
    {
      id: '002',
      code: 'CS310',
      name: 'Database Management Systems',
      credits: 3,
      instructor: 'Prof. Mikhail Petrov',
      department: 'Computer Science',
      schedule: {
        days: ['Tue', 'Thu'],
        time: '1:00 PM - 2:30 PM',
        location: 'Building 2, Room 206'
      },
      progress: 78,
      attendance: 88,
      assignments: {
        total: 6,
        completed: 4,
        upcoming: [
          { title: 'SQL Query Optimization', dueDate: '2025-03-20' }
        ]
      },
      grades: {
        midterm: 82,
        assignments: 85,
        participation: 90,
        currentGrade: 85
      }
    },
    {
      id: '003',
      code: 'CS350',
      name: 'Computer Networks',
      credits: 3,
      instructor: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      schedule: {
        days: ['Wed', 'Fri'],
        time: '3:00 PM - 4:30 PM',
        location: 'Building 1, Room 302'
      },
      progress: 42,
      attendance: 75,
      assignments: {
        total: 7,
        completed: 3,
        upcoming: [
          { title: 'Network Protocol Analysis', dueDate: '2025-03-18' },
          { title: 'Socket Programming Project', dueDate: '2025-03-30' }
        ]
      },
      grades: {
        assignments: 78,
        participation: 70,
        currentGrade: 75
      }
    },
    {
      id: '004',
      code: 'MA201',
      name: 'Discrete Mathematics',
      credits: 3,
      instructor: 'Dr. Robert Chen',
      department: 'Mathematics',
      schedule: {
        days: ['Mon', 'Fri'],
        time: '9:00 AM - 10:30 AM',
        location: 'Building 4, Room 201'
      },
      progress: 90,
      attendance: 96,
      assignments: {
        total: 5,
        completed: 5,
        upcoming: []
      },
      grades: {
        midterm: 95,
        assignments: 92,
        participation: 98,
        currentGrade: 95
      }
    }
  ];

  const examSchedule = [
    { 
      course: 'Data Structures and Algorithms',
      code: 'CS301',
      date: '2025-04-10',
      time: '9:00 AM - 12:00 PM',
      location: 'Building 3, Hall A',
      type: 'Final Exam'
    },
    { 
      course: 'Database Management Systems',
      code: 'CS310',
      date: '2025-04-13',
      time: '1:00 PM - 4:00 PM',
      location: 'Building 2, Hall B',
      type: 'Final Exam'
    },
    { 
      course: 'Computer Networks',
      code: 'CS350',
      date: '2025-04-15',
      time: '9:00 AM - 12:00 PM',
      location: 'Building 1, Hall C',
      type: 'Final Exam'
    },
    { 
      course: 'Discrete Mathematics',
      code: 'MA201',
      date: '2025-04-17',
      time: '1:00 PM - 4:00 PM',
      location: 'Building 4, Hall A',
      type: 'Final Exam'
    }
  ];

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 AM - 9:30 AM',
    '9:30 AM - 11:00 AM',
    '11:00 AM - 12:30 PM',
    '12:30 PM - 1:30 PM',
    '1:30 PM - 3:00 PM',
    '3:00 PM - 4:30 PM',
    '4:30 PM - 6:00 PM'
  ];

  // Generate the timetable
  const generateTimetable = () => {
    const timetable: Record<string, Record<string, CourseType | null>> = {};
    
    // Initialize empty timetable
    weekdays.forEach(day => {
      timetable[day] = {};
      timeSlots.forEach(slot => {
        timetable[day][slot] = null;
      });
    });
    
    // Fill timetable with courses
    courses.forEach(course => {
      const timeSlot = timeSlots.find(slot => slot === course.schedule.time);
      if (timeSlot) {
        course.schedule.days.forEach(day => {
          const fullDay = day === 'Mon' ? 'Monday' : 
                         day === 'Tue' ? 'Tuesday' : 
                         day === 'Wed' ? 'Wednesday' : 
                         day === 'Thu' ? 'Thursday' : 'Friday';
          
          timetable[fullDay][timeSlot] = course;
        });
      }
    });
    
    return timetable;
  };

  const timetable = generateTimetable();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Academics</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          {[
            { key: 'courses', label: 'My Courses', icon: <BookOpen size={16} /> },
            { key: 'timetable', label: 'Timetable', icon: <Calendar size={16} /> },
            { key: 'grades', label: 'Grades & Progress', icon: <BarChart3 size={16} /> },
            { key: 'exams', label: 'Exam Schedule', icon: <Clock size={16} /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.key 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Current Courses</h2>
            <Button variant="outline" size="sm">
              View Past Courses
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-gray-600">{course.code} • {course.credits} credits</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600">{course.department}</div>
                      <div className="text-sm text-gray-500">Prof. {course.instructor.split(' ')[1]}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>{course.schedule.days.join(', ')} • {course.schedule.time}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span>{course.schedule.location}</span>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Course Progress</span>
                        <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Attendance</span>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            course.attendance >= 90 ? 'text-green-600' : 
                            course.attendance >= 75 ? 'text-amber-600' : 'text-red-600'
                          }`}>{course.attendance}%</span>
                          {course.attendance < 75 && (
                            <AlertCircle size={16} className="ml-1 text-red-600" />
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-700">Assignments</span>
                        <div className="text-sm font-medium text-gray-700">
                          {course.assignments.completed}/{course.assignments.total} Completed
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-700">Current Grade</span>
                        <div className="text-sm font-medium text-gray-700">
                          {course.grades.currentGrade ? `${course.grades.currentGrade}%` : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {course.assignments.upcoming.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Upcoming Assignments</h4>
                      <div className="space-y-2">
                        {course.assignments.upcoming.map((assignment, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <FileText size={16} className="text-blue-600" />
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium text-gray-800">{assignment.title}</p>
                              <p className="text-xs text-gray-500">
                                Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                                  month: 'short', day: 'numeric', year: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-end">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" /> Download Schedule
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Time / Day
                    </th>
                    {weekdays.map((day) => (
                      <th key={day} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timeSlots.map((slot) => (
                    <tr key={slot} className={slot === '12:30 PM - 1:30 PM' ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {slot}
                        {slot === '12:30 PM - 1:30 PM' && <span className="text-gray-500 text-xs ml-2">(Lunch Break)</span>}
                      </td>
                      {weekdays.map((day) => {
                        const course = timetable[day][slot];
                        return (
                          <td key={`${day}-${slot}`} className="px-4 py-4">
                            {course ? (
                              <div className="bg-blue-50 border-l-4 border-blue-500 p-2 rounded-r-md">
                                <div className="font-medium text-blue-800">{course.code}</div>
                                <div className="text-xs text-blue-700 truncate max-w-[150px]">{course.name}</div>
                                <div className="text-xs text-blue-600 mt-1">{course.schedule.location}</div>
                              </div>
                            ) : slot === '12:30 PM - 1:30 PM' ? (
                              <div className="text-xs text-gray-500 italic">Lunch Break</div>
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Bell className="h-5 w-5 text-amber-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Schedule Information</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Your class schedule is updated automatically based on your course registrations.</li>
                    <li>For any scheduling conflicts or issues, please contact the Registrar's Office.</li>
                    <li>The academic week runs Monday through Friday. Weekend classes (if any) are displayed on a separate schedule.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grades Tab */}
      {activeTab === 'grades' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Grades & Academic Performance</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <TrendingUp size={16} className="mr-2" /> Progress Report
              </Button>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" /> Download Transcript
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Semester GPA</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-200"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-blue-600"
                      strokeWidth="10"
                      strokeDasharray={352}
                      strokeDashoffset={352 * (1 - 3.7/4)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-3xl font-bold text-gray-900">3.7</span>
                    <span className="text-sm text-gray-600 block">out of 4.0</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Previous Semester:</span>
                  <span className="font-medium text-gray-900">3.5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Change:</span>
                  <span className="font-medium text-green-600">+0.2</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cumulative GPA</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-200"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-green-600"
                      strokeWidth="10"
                      strokeDasharray={352}
                      strokeDashoffset={352 * (1 - 3.65/4)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-3xl font-bold text-gray-900">3.65</span>
                    <span className="text-sm text-gray-600 block">out of 4.0</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Credits:</span>
                  <span className="font-medium text-gray-900">75</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Standing:</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Credit Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Credits Completed</span>
                    <span className="text-sm font-medium text-gray-900">75 / 120</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: '62.5%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Major Requirements</span>
                    <span className="text-sm font-medium text-gray-900">36 / 60</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Electives</span>
                    <span className="text-sm font-medium text-gray-900">21 / 30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">General Education</span>
                    <span className="text-sm font-medium text-gray-900">18 / 30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-amber-600 h-2.5 rounded-full" 
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Current Semester Grades</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Midterm
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assignments
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Grade
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.code}</div>
                        <div className="text-sm text-gray-500">{course.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.grades.midterm ? `${course.grades.midterm}%` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.grades.assignments}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.grades.participation}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.grades.currentGrade && course.grades.currentGrade >= 90 ? 'bg-green-100 text-green-800' : 
                          course.grades.currentGrade && course.grades.currentGrade >= 80 ? 'bg-blue-100 text-blue-800' : 
                          course.grades.currentGrade && course.grades.currentGrade >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                          course.grades.currentGrade ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.grades.currentGrade ? `${course.grades.currentGrade}%` : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.grades.currentGrade && course.grades.currentGrade >= 70 ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle size={16} className="mr-1" /> Passing
                          </span>
                        ) : course.grades.currentGrade ? (
                          <span className="flex items-center text-red-600">
                            <AlertCircle size={16} className="mr-1" /> At Risk
                          </span>
                        ) : (
                          <span className="flex items-center text-gray-500">
                            <Clock size={16} className="mr-1" /> In Progress
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Exams Tab */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Exams</h2>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" /> Download Schedule
            </Button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Bell className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Final Exam Period</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Spring Semester final exams will be held from April 10 to April 18, 2025. Please review your schedule and prepare accordingly.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examSchedule.map((exam, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{exam.code}</div>
                        <div className="text-sm text-gray-500">{exam.course}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(exam.date).toLocaleDateString('en-US', { 
                          weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {exam.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {exam.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {exam.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="flex items-center text-blue-600">
                          <Calendar size={16} className="mr-1" /> Scheduled
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Exam Policies & Guidelines</h3>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" /> Attendance Requirements
                  </h4>
                  <p className="text-gray-600 ml-6 mt-1">
                    Students must arrive at least 15 minutes before the scheduled exam time. Bring your student ID card for verification.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" /> Permitted Materials
                  </h4>
                  <p className="text-gray-600 ml-6 mt-1">
                    Only authorized materials are allowed in the exam room. Course-specific information will be provided by your instructor.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" /> Special Accommodations
                  </h4>
                  <p className="text-gray-600 ml-6 mt-1">
                    Students requiring special accommodations must submit requests to the Office of Accessibility Services at least two weeks before the exam date.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" /> Missed Exams
                  </h4>
                  <p className="text-gray-600 ml-6 mt-1">
                    If you miss an exam due to illness or emergency, contact your instructor and the Academic Affairs Office within 24 hours with appropriate documentation.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="link" className="flex items-center text-blue-600">
                  View Full Exam Policy <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this component that might be missing
const MapPin: React.FC<{ size: number; className: string }> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
};

export default AcademicsPage;