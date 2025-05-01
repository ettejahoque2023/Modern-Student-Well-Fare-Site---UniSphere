import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Users, Clock, Award, MapPin } from 'lucide-react';
import { Button } from '../components/common/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-800/70 z-10" />
        <div 
          className="h-[90vh] bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-2xl text-white">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                Shaping Tomorrow's Leaders Today
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl mb-8"
              >
                Discover a world-class education that prepares you for success in a rapidly changing world. Join our diverse community of scholars and innovators.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/register">
                  <Button size="lg">Apply Now</Button>
                </Link>
                <Link to="/map">
                  <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm">
                    <MapPin size={18} className="mr-2" /> Explore Campus
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Excellence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse range of programs are designed to challenge, inspire, and prepare you for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Undergraduate',
                description: 'Comprehensive programs spanning engineering, health sciences, business, and liberal arts.',
                programs: ['Engineering', 'Allied Health', 'Management', 'Pharmacy', 'Literature', 'Multimedia'],
                icon: <BookOpen className="text-blue-600" size={24} />,
              },
              {
                title: 'Postgraduate',
                description: 'Advanced studies for professionals looking to specialize and elevate their expertise.',
                programs: ['Law', 'MTech', 'MBA', 'Medical Sciences'],
                icon: <Award className="text-purple-600" size={24} />,
              },
              {
                title: 'Diploma',
                description: 'Focused skill development programs designed for quick entry into the workforce.',
                programs: ['Computer Applications', 'Business Management', 'Healthcare'],
                icon: <Clock className="text-amber-600" size={24} />,
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2 mb-4">
                  {category.programs.map((program, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <ChevronRight size={16} className="text-blue-500 mr-2" />
                      {program}
                    </li>
                  ))}
                </ul>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  Learn more <ChevronRight size={16} className="ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">University Life</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience a vibrant campus community with state-of-the-art facilities and endless opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Modern Campus',
                description: 'State-of-the-art facilities including smart classrooms, research labs, and recreational spaces.',
                image: 'https://images.pexels.com/photos/2361/nature-Architecture-building-campus.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                title: 'Vibrant Community',
                description: 'Join over 10,000 students from 50+ countries in a diverse and inclusive learning environment.',
                image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                title: 'Student Support',
                description: 'Comprehensive academic advising, career services, and wellness programs to ensure your success.',
                image: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                title: 'Research Excellence',
                description: 'Opportunities to work alongside leading researchers on groundbreaking projects across disciplines.',
                image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                title: 'Global Connections',
                description: 'International partnerships with prestigious universities offering exchange and collaborative programs.',
                image: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                title: 'Career Ready',
                description: 'Industry-aligned curriculum and internship opportunities with leading companies worldwide.',
                image: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Showcase Preview */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Artwork</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating creativity and artistic expression across our community.
            </p>
          </div>

          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide">
              {[
                {
                  title: "Urban Reflection",
                  artist: "Maya Johnson",
                  year: 2023,
                  image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  title: "Morning Light",
                  artist: "James Chen",
                  year: 2023,
                  image: "https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  title: "Abstract Thoughts",
                  artist: "Sophia Williams",
                  year: 2022,
                  image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  title: "Nature's Embrace",
                  artist: "David Kim",
                  year: 2023,
                  image: "https://images.pexels.com/photos/1647214/pexels-photo-1647214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  title: "Vibrant Dreams",
                  artist: "Elena Rodriguez",
                  year: 2022,
                  image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
              ].map((artwork, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-[280px] max-w-[280px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{artwork.title}</h3>
                    <p className="text-gray-600">{artwork.artist}, {artwork.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-white via-white/50 to-transparent w-16 h-full pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-l from-white via-white/50 to-transparent w-16 h-full pointer-events-none"></div>
          </div>

          <div className="text-center mt-8">
            <Link to="/dashboard/art-showcase">
              <Button>View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our vibrant community of learners, innovators, and future leaders. Your future begins here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button variant="secondary" size="lg">Apply Today</Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Take a Virtual Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;