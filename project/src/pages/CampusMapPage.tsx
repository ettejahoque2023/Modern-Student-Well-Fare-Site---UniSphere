import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, Home, Book, Coffee, Users, MusicIcon, Dumbbell, BookOpen, Building2, Bath } from 'lucide-react';

const CampusMapPage: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ id: string; x: number; y: number } | null>(null);

  const buildings = [
    { id: 'building1', name: 'Academic Building 1', type: 'academic', x: 120, y: 150, icon: <Book size={24} />, description: 'Houses the Engineering and Computer Science departments with state-of-the-art laboratories.' },
    { id: 'building2', name: 'Academic Building 2', type: 'academic', x: 220, y: 180, icon: <Book size={24} />, description: 'Home to the Business School and Economics department with modern classrooms.' },
    { id: 'building3', name: 'Academic Building 3', type: 'academic', x: 320, y: 150, icon: <Book size={24} />, description: 'Contains the Humanities, Social Sciences, and Language departments.' },
    { id: 'building4', name: 'Academic Building 4', type: 'academic', x: 420, y: 180, icon: <Book size={24} />, description: 'Houses the Science departments including Physics, Chemistry, and Biology labs.' },
    { id: 'building5', name: 'Academic Building 5', type: 'academic', x: 520, y: 150, icon: <Book size={24} />, description: 'Dedicated to Fine Arts, Design, and Architecture studies.' },
    { id: 'library', name: 'University Library', type: 'facility', x: 320, y: 250, icon: <BookOpen size={24} />, description: 'Central library with over 500,000 books, digital resources, and study spaces.' },
    { id: 'admin', name: 'Administration Building', type: 'admin', x: 320, y: 80, icon: <Building2 size={24} />, description: 'Main administrative offices, including admissions, registrar, and financial services.' },
    { id: 'boysHostel', name: 'Boys Hostel', type: 'residence', x: 180, y: 350, icon: <Home size={24} />, description: 'Residence halls for male students with shared common areas and amenities.' },
    { id: 'girlsHostel', name: 'Girls Hostel', type: 'residence', x: 460, y: 350, icon: <Home size={24} />, description: 'Residence halls for female students with modern facilities and security.' },
    { id: 'canteen1', name: 'Main Canteen', type: 'facility', x: 260, y: 300, icon: <Coffee size={24} />, description: 'Central dining facility offering diverse meal options and seating areas.' },
    { id: 'canteen2', name: 'Coffee Shop', type: 'facility', x: 380, y: 300, icon: <Coffee size={24} />, description: 'Popular cafe serving coffee, snacks, and light meals throughout the day.' },
    { id: 'restrooms1', name: 'Restrooms Block A', type: 'facility', x: 220, y: 230, icon: <Bath size={24} />, description: 'Public restrooms located near Academic Buildings 1 and 2.' },
    { id: 'restrooms2', name: 'Restrooms Block B', type: 'facility', x: 420, y: 230, icon: <Bath size={24} />, description: 'Public restrooms located near Academic Buildings 4 and 5.' },
    { id: 'auditorium', name: 'Main Auditorium', type: 'facility', x: 320, y: 400, icon: <Users size={24} />, description: 'Large venue for university events, conferences, and performances.' },
    { id: 'playground', name: 'Sports Field', type: 'recreation', x: 120, y: 450, icon: <Users size={24} />, description: 'Multi-purpose sports field for football, cricket, and athletics.' },
    { id: 'gym', name: 'University Gym', type: 'recreation', x: 520, y: 450, icon: <Dumbbell size={24} />, description: 'Fitness center with modern equipment, training areas, and fitness classes.' },
    { id: 'sickroom', name: 'Health Center', type: 'facility', x: 320, y: 500, icon: <Info size={24} />, description: 'On-campus medical facility providing basic healthcare services.' }
  ];

  const handleMouseEnter = (id: string, x: number, y: number) => {
    setTooltip({ id, x, y });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleBuildingClick = (id: string) => {
    setSelectedBuilding(id === selectedBuilding ? null : id);
  };

  // Define building colors by type
  const getBuildingColor = (type: string) => {
    switch (type) {
      case 'academic': return '#3B82F6'; // blue
      case 'residence': return '#10B981'; // green
      case 'facility': return '#8B5CF6'; // purple
      case 'admin': return '#F59E0B'; // amber
      case 'recreation': return '#EC4899'; // pink
      default: return '#6B7280'; // gray
    }
  };

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Campus Map</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our university campus to locate buildings, facilities, and more.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map legend */}
          <div className="lg:w-1/4">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Legend</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span>Academic Buildings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Residence Halls</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                  <span>Facilities</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                  <span>Administration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
                  <span>Recreation</span>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Building Information</h2>
              {selectedBuilding ? (
                <div>
                  <h3 className="font-medium text-lg">
                    {buildings.find(b => b.id === selectedBuilding)?.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {buildings.find(b => b.id === selectedBuilding)?.description}
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">Select a building on the map to see more details.</p>
              )}
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow-sm relative">
              <div 
                className="w-full h-[600px] border border-gray-200 rounded-lg relative overflow-hidden bg-blue-50"
                style={{ backgroundImage: 'url("https://images.pexels.com/photos/2874682/pexels-photo-2874682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }}
              >
                {/* Walking paths */}
                <svg width="100%" height="100%" className="absolute top-0 left-0">
                  <path d="M320,80 L320,250 L220,180 L120,150" stroke="#94A3B8" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                  <path d="M320,80 L320,250 L420,180 L520,150" stroke="#94A3B8" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                  <path d="M320,250 L320,400" stroke="#94A3B8" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                  <path d="M320,250 L260,300 L180,350" stroke="#94A3B8" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                  <path d="M320,250 L380,300 L460,350" stroke="#94A3B8" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                  <path d="M320,400 L120,450" stroke="#94A3B8" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                  <path d="M320,400 L520,450" stroke="#94A3B8" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                  <path d="M320,400 L320,500" stroke="#94A3B8" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                </svg>

                {/* Buildings */}
                {buildings.map((building) => (
                  <motion.div
                    key={building.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute cursor-pointer ${selectedBuilding === building.id ? 'z-10' : 'z-0'}`}
                    style={{ 
                      left: building.x, 
                      top: building.y,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseEnter={() => handleMouseEnter(building.id, building.x, building.y)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleBuildingClick(building.id)}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${selectedBuilding === building.id ? 'ring-4 ring-offset-2 ring-blue-300' : ''}`}
                      style={{ backgroundColor: getBuildingColor(building.type) }}
                    >
                      {building.icon}
                    </div>
                    
                    {/* Permanent labels for important buildings */}
                    {['admin', 'library', 'boysHostel', 'girlsHostel', 'auditorium'].includes(building.id) && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-md shadow-sm text-xs font-medium">
                        {building.name}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Tooltip */}
                {tooltip && (
                  <div 
                    className="absolute z-20 bg-white p-2 rounded-md shadow-md text-sm"
                    style={{ 
                      left: tooltip.x,
                      top: tooltip.y - 45,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    {buildings.find(b => b.id === tooltip.id)?.name}
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mt-4 text-sm text-gray-500">
                <MapPin size={16} className="mr-1" /> 
                <span>Tap on any building for more information</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMapPage;