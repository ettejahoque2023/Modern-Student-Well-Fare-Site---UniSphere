import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaintBucket, Heart, MessageSquare, Eye, X, Upload, Filter, Camera, Brush } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

type ArtworkType = 'painting' | 'photography' | 'digital' | 'sculpture' | 'other';

type Artwork = {
  id: number;
  title: string;
  type: ArtworkType;
  description: string;
  image: string;
  artist: {
    id: string;
    name: string;
    department: string;
    year: number;
  };
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  createdAt: string;
};

const ArtShowcasePage: React.FC = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([
    {
      id: 1,
      title: "Urban Dreams",
      type: "painting",
      description: "Oil painting exploring the intersection of nature and urban landscapes.",
      image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      artist: {
        id: "101",
        name: "Maya Johnson",
        department: "Fine Arts",
        year: 3,
      },
      likes: 42,
      comments: 8,
      views: 156,
      isLiked: false,
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      title: "Reflections",
      type: "photography",
      description: "A moment captured at dawn when the world seems perfectly balanced between night and day.",
      image: "https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      artist: {
        id: "102",
        name: "James Chen",
        department: "Media Studies",
        year: 4,
      },
      likes: 38,
      comments: 5,
      views: 120,
      isLiked: true,
      createdAt: "2025-01-28",
    },
    {
      id: 3,
      title: "Abstract Emotions",
      type: "digital",
      description: "Digital artwork exploring the complexity of human emotions through color and form.",
      image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      artist: {
        id: "103",
        name: "Sophia Williams",
        department: "Graphic Design",
        year: 2,
      },
      likes: 65,
      comments: 12,
      views: 230,
      isLiked: false,
      createdAt: "2025-02-05",
    },
    {
      id: 4,
      title: "Serenity",
      type: "photography",
      description: "Nature photography capturing the peace and tranquility of an untouched forest.",
      image: "https://images.pexels.com/photos/1647214/pexels-photo-1647214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      artist: {
        id: "104",
        name: "David Kim",
        department: "Environmental Science",
        year: 3,
      },
      likes: 29,
      comments: 4,
      views: 105,
      isLiked: false,
      createdAt: "2025-01-20",
    },
    {
      id: 5,
      title: "Vibrant Chaos",
      type: "painting",
      description: "Acrylic painting exploring the beautiful disorder found in everyday life.",
      image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      artist: {
        id: "105",
        name: "Elena Rodriguez",
        department: "Fine Arts",
        year: 4,
      },
      likes: 51,
      comments: 9,
      views: 178,
      isLiked: true,
      createdAt: "2025-02-10",
    },
    {
      id: 6,
      title: "Digital Dreamscape",
      type: "digital",
      description: "3D rendered fantasy landscape inspired by surrealist painters.",
      image: "https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      artist: {
        id: "106",
        name: "Marcus Lee",
        department: "Computer Science",
        year: 3,
      },
      likes: 47,
      comments: 11,
      views: 203,
      isLiked: false,
      createdAt: "2025-01-30",
    }
  ]);
  
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedType, setSelectedType] = useState<ArtworkType | null>(null);
  
  const [uploadData, setUploadData] = useState({
    title: '',
    type: 'painting' as ArtworkType,
    description: '',
    file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUploadData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadData.title || !uploadData.description || !uploadData.file) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Mock submission
    toast.success('Artwork uploaded successfully!');
    setShowUploadForm(false);
    
    // Reset form
    setUploadData({
      title: '',
      type: 'painting',
      description: '',
      file: null,
    });
  };

  const toggleLike = (id: number) => {
    setArtworks(prevArtworks => 
      prevArtworks.map(artwork => 
        artwork.id === id 
          ? { 
              ...artwork, 
              isLiked: !artwork.isLiked,
              likes: artwork.isLiked ? artwork.likes - 1 : artwork.likes + 1
            }
          : artwork
      )
    );
    
    if (selectedArtwork && selectedArtwork.id === id) {
      setSelectedArtwork(prev => 
        prev ? { 
          ...prev, 
          isLiked: !prev.isLiked,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
        } : null
      );
    }
  };

  const filteredArtworks = selectedType 
    ? artworks.filter(artwork => artwork.type === selectedType)
    : artworks;

  const getTypeIcon = (type: ArtworkType) => {
    switch (type) {
      case 'painting': return <Brush size={16} />;
      case 'photography': return <Camera size={16} />;
      case 'digital': return <PaintBucket size={16} />;
      default: return <PaintBucket size={16} />;
    }
  };

  const getTypeColor = (type: ArtworkType) => {
    switch (type) {
      case 'painting': return 'bg-blue-100 text-blue-800';
      case 'photography': return 'bg-purple-100 text-purple-800';
      case 'digital': return 'bg-green-100 text-green-800';
      case 'sculpture': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Art Showcase</h1>
        <Button onClick={() => setShowUploadForm(true)}>
          <Upload size={16} className="mr-2" /> Submit Artwork
        </Button>
      </div>

      {showUploadForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upload Your Artwork</h2>
            <button
              onClick={() => setShowUploadForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Artwork Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={uploadData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Artwork Type
                </label>
                <select
                  name="type"
                  value={uploadData.type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="painting">Painting</option>
                  <option value="photography">Photography</option>
                  <option value="digital">Digital Art</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={uploadData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                  placeholder="Tell us about your artwork, inspiration, techniques used, etc."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="artwork-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {uploadData.file ? (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <img
                          src={URL.createObjectURL(uploadData.file)}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setUploadData(prev => ({ ...prev, file: null }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or WEBP (MAX. 10MB)
                        </p>
                      </div>
                    )}
                    <input
                      id="artwork-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowUploadForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Upload Artwork</Button>
            </div>
          </form>
        </motion.div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                  selectedType === null 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedType(null)}
              >
                All
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border-t border-b ${
                  selectedType === 'painting' 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedType('painting')}
              >
                Paintings
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border-t border-b ${
                  selectedType === 'photography' 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedType('photography')}
              >
                Photography
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                  selectedType === 'digital' 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedType('digital')}
              >
                Digital Art
              </button>
            </div>
            
            <button
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              title="More filters"
            >
              <Filter size={20} className="text-gray-600" />
            </button>
            
            <div className="flex-grow"></div>
            
            <p className="text-sm text-gray-600">
              Showing {filteredArtworks.length} artworks
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <p className="font-medium">{artwork.title}</p>
                    <p className="text-sm text-white/80">{artwork.artist.name}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getTypeColor(artwork.type)}`}>
                      {getTypeIcon(artwork.type)}
                      <span className="ml-1">{artwork.type.charAt(0).toUpperCase() + artwork.type.slice(1)}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(artwork.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 truncate">
                    {artwork.title}
                  </h3>
                  
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {artwork.description}
                  </p>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(artwork.id);
                        }}
                        className="flex items-center space-x-1 group"
                      >
                        <Heart size={16} className={artwork.isLiked ? "text-red-500" : "text-gray-400 group-hover:text-red-500"} fill={artwork.isLiked ? "currentColor" : "none"} />
                        <span>{artwork.likes}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <MessageSquare size={16} className="text-gray-400" />
                        <span>{artwork.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={16} className="text-gray-400" />
                        <span>{artwork.views}</span>
                      </div>
                    </div>
                    
                    <button
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArtwork(artwork);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Artwork Detail Modal */}
          <AnimatePresence>
            {selectedArtwork && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedArtwork(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-3/5 h-64 md:h-auto bg-gray-100">
                      <img
                        src={selectedArtwork.image}
                        alt={selectedArtwork.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="md:w-2/5 p-6 overflow-y-auto">
                      <button
                        onClick={() => setSelectedArtwork(null)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                      
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getTypeColor(selectedArtwork.type)}`}>
                        {getTypeIcon(selectedArtwork.type)}
                        <span className="ml-1">{selectedArtwork.type.charAt(0).toUpperCase() + selectedArtwork.type.slice(1)}</span>
                      </span>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mt-2">
                        {selectedArtwork.title}
                      </h2>
                      
                      <div className="mt-2 flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          {selectedArtwork.artist.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedArtwork.artist.name}</p>
                          <p className="text-sm text-gray-500">
                            {selectedArtwork.artist.department} • Year {selectedArtwork.artist.year}
                          </p>
                        </div>
                      </div>
                      
                      <p className="mt-4 text-gray-600">
                        {selectedArtwork.description}
                      </p>
                      
                      <div className="mt-6 flex items-center space-x-4 text-gray-500">
                        <button
                          onClick={() => toggleLike(selectedArtwork.id)}
                          className="flex items-center space-x-1 group"
                        >
                          <Heart size={20} className={selectedArtwork.isLiked ? "text-red-500" : "text-gray-400 group-hover:text-red-500"} fill={selectedArtwork.isLiked ? "currentColor" : "none"} />
                          <span>{selectedArtwork.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1">
                          <MessageSquare size={20} className="text-gray-400" />
                          <span>{selectedArtwork.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye size={20} className="text-gray-400" />
                          <span>{selectedArtwork.views}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-t border-gray-200 pt-4">
                        <h3 className="font-medium text-gray-900 mb-2">Comments</h3>
                        
                        {/* Mock comments */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-start">
                              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 flex-shrink-0">
                                L
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Lisa Chang</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  Beautiful work! I love the use of color and composition.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start">
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                                T
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Thomas Reed</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  The contrast between light and shadow is really striking. What techniques did you use?
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <textarea
                            placeholder="Add a comment..."
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={2}
                          ></textarea>
                          <div className="mt-2 flex justify-end">
                            <Button size="sm">Post Comment</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default ArtShowcasePage;