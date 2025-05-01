import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, BookOpen, Users, MapPin, Calendar, Clock, Globe } from 'lucide-react';
import { Button } from '../components/common/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-800/70 z-10" />
        <div 
          className="h-[60vh] bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About UniPortal</h1>
              <p className="text-xl">
                Discover our rich history, mission, and commitment to academic excellence and student success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 mb-8">
              At UniPortal, we are dedicated to fostering intellectual growth, cultural understanding, and social responsibility. 
              Our mission is to provide transformative educational experiences that prepare students to become thoughtful, 
              engaged citizens and leaders in their communities and beyond.
            </p>
            <p className="text-xl text-gray-600">
              We envision a world where education empowers individuals to tackle global challenges, bridge cultural divides, 
              and create positive change. Through innovative teaching, research, and community engagement, 
              we strive to be at the forefront of this transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">UniPortal at a Glance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key figures that showcase our vibrant and diverse academic community.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '15,000+', label: 'Students', icon: <Users className="text-blue-600" size={24} /> },
              { number: '1,200+', label: 'Faculty Members', icon: <BookOpen className="text-blue-600" size={24} /> },
              { number: '100+', label: 'Academic Programs', icon: <Award className="text-blue-600" size={24} /> },
              { number: '85+', label: 'Countries Represented', icon: <Globe className="text-blue-600" size={24} /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our History</h2>
              <p className="text-xl text-gray-600">
                Founded in 1975, UniPortal has a rich history of academic innovation and excellence.
              </p>
            </div>
            
            <div className="space-y-12">
              {[
                {
                  year: '1975',
                  title: 'Founding',
                  description: 'UniPortal was established with a vision to provide quality education accessible to all. Starting with just three departments and 200 students, our journey began in a modest campus on the outskirts of the city.',
                  icon: <Calendar />
                },
                {
                  year: '1985',
                  title: 'Expansion',
                  description: 'A decade after its founding, the university experienced significant growth, adding seven new departments and constructing the central library and science complex. Student enrollment surpassed 2,000.',
                  icon: <Users />
                },
                {
                  year: '2000',
                  title: 'Technological Revolution',
                  description: 'At the turn of the millennium, UniPortal embraced digital transformation, establishing the Computer Science department and integrating technology across all faculties. The first online courses were introduced.',
                  icon: <Globe />
                },
                {
                  year: '2010',
                  title: 'Global Recognition',
                  description: 'UniPortal achieved international accreditation and established partnerships with leading universities worldwide. The international student exchange program was launched, bringing global diversity to our campus.',
                  icon: <Award />
                },
                {
                  year: '2025',
                  title: 'Present Day',
                  description: 'Today, UniPortal stands as a premier institution with over 15,000 students from 85+ countries. Our commitment to excellence in education, research, and innovation continues to shape the future of learning.',
                  icon: <GraduationCap />
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                      {milestone.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-blue-600">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-gray-900 ml-3">{milestone.title}</h3>
                    </div>
                    <p className="mt-2 text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">University Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated team guiding our institution toward excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Robert Chen',
                title: 'President',
                image: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                bio: 'Dr. Chen brings over 25 years of experience in higher education leadership and a passion for academic innovation.'
              },
              {
                name: 'Dr. Sarah Johnson',
                title: 'Vice President of Academic Affairs',
                image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                bio: 'With a background in educational psychology, Dr. Johnson leads our academic programs with a focus on student-centered learning.'
              },
              {
                name: 'Dr. Michael Rodriguez',
                title: 'Dean of Students',
                image: 'https://images.pexels.com/photos/5794804/pexels-photo-5794804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                bio: 'Dr. Rodriguez oversees student life and services, ensuring a supportive and engaging campus environment for all students.'
              }
            ].map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{leader.name}</h3>
                  <p className="text-blue-600 font-medium">{leader.title}</p>
                  <p className="mt-2 text-gray-600">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our decisions, actions, and aspirations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Excellence', description: 'We strive for the highest standards in teaching, research, and service.' },
              { title: 'Integrity', description: 'We act with honesty, transparency, and ethical responsibility in all we do.' },
              { title: 'Diversity', description: 'We embrace and celebrate differences, fostering an inclusive community.' },
              { title: 'Innovation', description: 'We encourage creative thinking and pioneering approaches to challenges.' },
              { title: 'Collaboration', description: 'We believe in the power of partnership and teamwork across disciplines.' },
              { title: 'Respect', description: 'We treat each individual with dignity and value diverse perspectives.' },
              { title: 'Sustainability', description: 'We are committed to environmental responsibility and future generations.' },
              { title: 'Global Citizenship', description: 'We prepare students to engage meaningfully with our interconnected world.' }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-600"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Campus</h2>
              <p className="text-xl text-gray-600 mb-6">
                Spanning 200 acres of beautiful landscape, our campus provides a vibrant and supportive environment for learning, research, and personal growth.
              </p>
              <p className="text-gray-600 mb-6">
                Our facilities include state-of-the-art laboratories, modern classrooms, a comprehensive library, sports complexes, and comfortable residence halls. The campus design integrates nature with architecture, creating spaces that inspire creativity and foster community.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-blue-600">
                    <MapPin size={16} />
                  </div>
                  <span className="ml-2 text-gray-600">Located in the heart of the city with easy access to cultural and professional opportunities</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-blue-600">
                    <BookOpen size={16} />
                  </div>
                  <span className="ml-2 text-gray-600">Modern library with over 500,000 volumes and extensive digital resources</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-blue-600">
                    <Users size={16} />
                  </div>
                  <span className="ml-2 text-gray-600">Residence halls accommodating 5,000+ students with diverse living options</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-blue-600">
                    <Clock size={16} />
                  </div>
                  <span className="ml-2 text-gray-600">Open spaces and recreational facilities promoting wellness and community</span>
                </li>
              </ul>
              <Link to="/map">
                <Button>
                  <MapPin size={16} className="mr-2" /> Explore Campus Map
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Campus Main Building"
                className="rounded-lg shadow-md"
              />
              <img
                src="https://images.pexels.com/photos/159669/university-student-education-doctoral-cap-159669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Campus Library"
                className="rounded-lg shadow-md"
              />
              <img
                src="https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Student Center"
                className="rounded-lg shadow-md"
              />
              <img
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Academic Building"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Discover the opportunities awaiting you at UniPortal. Take the next step in your educational journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button variant="secondary">Apply Today</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;