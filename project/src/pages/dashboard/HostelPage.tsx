import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, ClipboardCheck, ArrowRight, Clock, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const HostelPage: React.FC = () => {
  const { user } = useAuth();
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveFormData, setLeaveFormData] = useState({
    studentName: user?.name || '',
    studentId: user?.studentId || '',
    phoneNumber: '',
    parentPhoneNumber: '',
    outingAddress: '',
    purpose: '',
    outingDate: '',
    outingTime: '',
    returnDate: '',
    returnTime: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeaveFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!leaveFormData.studentName) errors.studentName = 'Student name is required';
    if (!leaveFormData.studentId) errors.studentId = 'Student ID is required';
    if (!leaveFormData.phoneNumber) errors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(leaveFormData.phoneNumber)) errors.phoneNumber = 'Enter a valid 10-digit phone number';
    
    if (!leaveFormData.parentPhoneNumber) errors.parentPhoneNumber = 'Parent phone number is required';
    else if (!/^\d{10}$/.test(leaveFormData.parentPhoneNumber)) errors.parentPhoneNumber = 'Enter a valid 10-digit phone number';
    
    if (!leaveFormData.outingAddress) errors.outingAddress = 'Outing address is required';
    if (!leaveFormData.purpose) errors.purpose = 'Purpose is required';
    if (!leaveFormData.outingDate) errors.outingDate = 'Outing date is required';
    if (!leaveFormData.outingTime) errors.outingTime = 'Outing time is required';
    if (!leaveFormData.returnDate) errors.returnDate = 'Return date is required';
    if (!leaveFormData.returnTime) errors.returnTime = 'Return time is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitLeaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Mock submission
    toast.success('Leave application submitted successfully!');
    setShowLeaveForm(false);
    
    // Reset form
    setLeaveFormData({
      studentName: user?.name || '',
      studentId: user?.studentId || '',
      phoneNumber: '',
      parentPhoneNumber: '',
      outingAddress: '',
      purpose: '',
      outingDate: '',
      outingTime: '',
      returnDate: '',
      returnTime: '',
    });
  };

  const roomDetails = {
    building: 'Block A',
    roomNumber: '203',
    roomType: 'Double Sharing',
    floorNumber: '2',
    bedNumber: 'B',
  };

  const leaveHistory = [
    { id: 1, from: '2025-01-15', to: '2025-01-18', purpose: 'Family function', status: 'approved' },
    { id: 2, from: '2024-12-20', to: '2025-01-05', purpose: 'Winter vacation', status: 'approved' },
    { id: 3, from: '2024-11-10', to: '2024-11-12', purpose: 'Medical appointment', status: 'approved' },
  ];

  const complaints = [
    { id: 1, date: '2025-02-01', issue: 'Plumbing issue in washroom', status: 'resolved' },
    { id: 2, date: '2025-01-20', issue: 'Wi-Fi connectivity problems', status: 'in-progress' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hostel Management</h1>
        <Button onClick={() => setShowLeaveForm(true)}>
          Apply for Leave
        </Button>
      </div>

      {showLeaveForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Hostel Leave Application</h2>
            <button
              onClick={() => setShowLeaveForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmitLeaveForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Student Name"
                name="studentName"
                value={leaveFormData.studentName}
                onChange={handleInputChange}
                error={formErrors.studentName}
                fullWidth
              />
              <Input
                label="Student ID"
                name="studentId"
                value={leaveFormData.studentId}
                onChange={handleInputChange}
                error={formErrors.studentId}
                fullWidth
              />
              <Input
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={leaveFormData.phoneNumber}
                onChange={handleInputChange}
                error={formErrors.phoneNumber}
                fullWidth
              />
              <Input
                label="Parent's Phone Number"
                name="parentPhoneNumber"
                type="tel"
                value={leaveFormData.parentPhoneNumber}
                onChange={handleInputChange}
                error={formErrors.parentPhoneNumber}
                fullWidth
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Outing Address
                </label>
                <textarea
                  name="outingAddress"
                  rows={3}
                  value={leaveFormData.outingAddress}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {formErrors.outingAddress && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.outingAddress}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Leave
                </label>
                <textarea
                  name="purpose"
                  rows={2}
                  value={leaveFormData.purpose}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {formErrors.purpose && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.purpose}</p>
                )}
              </div>
              <div>
                <Input
                  label="Outing Date"
                  name="outingDate"
                  type="date"
                  value={leaveFormData.outingDate}
                  onChange={handleInputChange}
                  error={formErrors.outingDate}
                  fullWidth
                />
              </div>
              <div>
                <Input
                  label="Outing Time"
                  name="outingTime"
                  type="time"
                  value={leaveFormData.outingTime}
                  onChange={handleInputChange}
                  error={formErrors.outingTime}
                  fullWidth
                />
              </div>
              <div>
                <Input
                  label="Return Date"
                  name="returnDate"
                  type="date"
                  value={leaveFormData.returnDate}
                  onChange={handleInputChange}
                  error={formErrors.returnDate}
                  fullWidth
                />
              </div>
              <div>
                <Input
                  label="Return Time"
                  name="returnTime"
                  type="time"
                  value={leaveFormData.returnTime}
                  onChange={handleInputChange}
                  error={formErrors.returnTime}
                  fullWidth
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowLeaveForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </motion.div>
      ) : (
        <>
          {/* Room Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Room Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 flex items-start">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <Home size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Room Details</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {roomDetails.building}, Room {roomDetails.roomNumber}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {roomDetails.roomType} • Floor {roomDetails.floorNumber} • Bed {roomDetails.bedNumber}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Hostel Warden</p>
                  <p className="font-medium">Mr. Robert Johnson</p>
                  <p className="text-sm text-gray-600 mt-2">Contact: +1-123-456-7890</p>
                </div>
                <div className="flex flex-col justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Mess Timings</p>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm">Breakfast: 7:00 AM - 9:00 AM</p>
                    <p className="text-sm">Lunch: 12:00 PM - 2:00 PM</p>
                    <p className="text-sm">Dinner: 7:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-amber-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Important Notice</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Hostel curfew time is 10:00 PM. Students returning after curfew must have prior approval.
                    Visitors are allowed only in common areas from 10:00 AM to 7:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Leave History */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave History</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Range
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Purpose
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveHistory.map((leave) => (
                    <tr key={leave.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {leave.purpose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          leave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          leave.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="link" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Complaints and Maintenance */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Complaints & Maintenance</h2>
              <Button variant="outline" size="sm">
                Report New Issue
              </Button>
            </div>
            
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {complaint.status === 'resolved' ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : complaint.status === 'in-progress' ? (
                        <Clock size={20} className="text-amber-500" />
                      ) : (
                        <HelpCircle size={20} className="text-red-500" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{complaint.issue}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                          complaint.status === 'in-progress' ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {complaint.status === 'in-progress' ? 'In Progress' : 
                           complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Reported on {new Date(complaint.date).toLocaleDateString()}
                      </p>
                      {complaint.status === 'resolved' && (
                        <p className="text-sm text-green-600 mt-2">
                          This issue has been fixed. If you still face problems, please report again.
                        </p>
                      )}
                      {complaint.status === 'in-progress' && (
                        <p className="text-sm text-amber-600 mt-2">
                          Our maintenance team is working on this issue. Expected resolution: 48 hours.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Hostel Rules */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hostel Rules & Regulations</h2>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <span className="text-sm font-medium">1</span>
                </div>
                <p className="text-gray-700">Hostel curfew time is 10:00 PM on weekdays and 11:00 PM on weekends.</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <span className="text-sm font-medium">2</span>
                </div>
                <p className="text-gray-700">Students must maintain cleanliness in their rooms and common areas.</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <span className="text-sm font-medium">3</span>
                </div>
                <p className="text-gray-700">Visitors are only allowed in designated areas from 10:00 AM to 7:00 PM.</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <span className="text-sm font-medium">4</span>
                </div>
                <p className="text-gray-700">Students must obtain prior permission for overnight leaves.</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <span className="text-sm font-medium">5</span>
                </div>
                <p className="text-gray-700">Cooking is strictly prohibited in hostel rooms. Use designated areas only.</p>
              </div>
              
              <div className="mt-2">
                <Button variant="link" className="flex items-center">
                  View complete rules <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </div>
  );
};

export default HostelPage;