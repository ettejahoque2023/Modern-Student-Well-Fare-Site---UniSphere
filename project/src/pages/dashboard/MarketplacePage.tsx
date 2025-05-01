import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingBag, BookOpen, Upload, Download, Tag, Heart, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

type Product = {
  id: number;
  title: string;
  description: string;
  type: 'book' | 'notes' | 'project' | 'other';
  price: number;
  condition?: string;
  author?: string;
  seller: {
    id: string;
    name: string;
    rating: number;
    department: string;
  };
  image: string;
  likes: number;
  isLiked: boolean;
  publishDate: string;
};

const MarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    type: 'notes',
    price: '',
    condition: 'new',
    author: '',
    file: null as File | null,
  });
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Data Structures & Algorithms Notes",
      description: "Comprehensive notes covering all major algorithms and data structures. Includes practice problems and solutions.",
      type: "notes",
      price: 15,
      seller: {
        id: "1",
        name: "Alex Johnson",
        rating: 4.8,
        department: "Computer Science",
      },
      image: "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 24,
      isLiked: false,
      publishDate: "2025-01-15",
    },
    {
      id: 2,
      title: "Introduction to Machine Learning",
      description: "Textbook in excellent condition. Covers fundamentals, supervised and unsupervised learning techniques.",
      type: "book",
      price: 45,
      condition: "Like New",
      author: "Dr. Sarah Williams",
      seller: {
        id: "2",
        name: "Priya Sharma",
        rating: 4.6,
        department: "Computer Science",
      },
      image: "https://images.pexels.com/photos/3184407/pexels-photo-3184407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 18,
      isLiked: true,
      publishDate: "2025-01-28",
    },
    {
      id: 3,
      title: "Organic Chemistry Lab Report Templates",
      description: "Professional templates for all organic chemistry lab reports with example analyses and discussions.",
      type: "notes",
      price: 10,
      seller: {
        id: "3",
        name: "David Kim",
        rating: 4.9,
        department: "Chemistry",
      },
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 32,
      isLiked: false,
      publishDate: "2025-02-01",
    },
    {
      id: 4,
      title: "Web Development Final Project",
      description: "Complete e-commerce website project with source code, documentation, and video walkthrough.",
      type: "project",
      price: 60,
      seller: {
        id: "4",
        name: "Miguel Rodriguez",
        rating: 4.7,
        department: "Computer Science",
      },
      image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 45,
      isLiked: false,
      publishDate: "2025-01-20",
    },
    {
      id: 5,
      title: "Calculus I & II Complete Notes",
      description: "Detailed notes covering all topics from Calculus I and II with worked examples and exam tips.",
      type: "notes",
      price: 20,
      seller: {
        id: "5",
        name: "Emma Watson",
        rating: 4.9,
        department: "Mathematics",
      },
      image: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 37,
      isLiked: true,
      publishDate: "2025-02-05",
    },
    {
      id: 6,
      title: "Principles of Economics (8th Edition)",
      description: "Textbook in good condition with minimal highlighting. Contains all chapters and appendices.",
      type: "book",
      price: 35,
      condition: "Good",
      author: "N. Gregory Mankiw",
      seller: {
        id: "6",
        name: "James Wilson",
        rating: 4.5,
        department: "Economics",
      },
      image: "https://images.pexels.com/photos/5849592/pexels-photo-5849592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 12,
      isLiked: false,
      publishDate: "2025-01-10",
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productData.title || !productData.description || !productData.price || !productData.file) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Mock submission
    toast.success('Product uploaded successfully!');
    setShowUploadForm(false);
    
    // Reset form
    setProductData({
      title: '',
      description: '',
      type: 'notes',
      price: '',
      condition: 'new',
      author: '',
      file: null,
    });
  };

  const filteredProducts = products
    .filter(product => 
      (selectedType ? product.type === selectedType : true) &&
      (searchQuery ? 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true
      )
    );

  const toggleLike = (id: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id 
          ? { 
              ...product, 
              isLiked: !product.isLiked,
              likes: product.isLiked ? product.likes - 1 : product.likes + 1
            }
          : product
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notes': return <BookOpen size={16} />;
      case 'book': return <BookOpen size={16} />;
      case 'project': return <Download size={16} />;
      default: return <Tag size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'notes': return 'bg-blue-100 text-blue-800';
      case 'book': return 'bg-purple-100 text-purple-800';
      case 'project': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Marketplace</h1>
        <Button onClick={() => setShowUploadForm(true)}>
          <Upload size={16} className="mr-2" /> Upload Resource
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
            <h2 className="text-xl font-semibold text-gray-900">Upload Academic Resource</h2>
            <button
              onClick={() => setShowUploadForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Resource Title"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Resource Type
                </label>
                <select
                  name="type"
                  value={productData.type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="notes">Notes</option>
                  <option value="book">Book</option>
                  <option value="project">Project</option>
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
                  value={productData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>

              <Input
                label="Price (USD)"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={productData.price}
                onChange={handleInputChange}
                fullWidth
                required
              />

              {productData.type === 'book' && (
                <Input
                  label="Author"
                  name="author"
                  value={productData.author || ''}
                  onChange={handleInputChange}
                  fullWidth
                />
              )}

              {productData.type === 'book' && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={productData.condition}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, ZIP, or images (MAX. 100MB)
                      </p>
                      {productData.file && (
                        <p className="mt-2 text-sm text-blue-600 font-medium">
                          {productData.file.name}
                        </p>
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
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
              <Button type="submit">Upload Resource</Button>
            </div>
          </form>
        </motion.div>
      ) : (
        <>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for notes, books, projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
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
                    selectedType === 'notes' 
                      ? 'bg-blue-50 text-blue-700 border-blue-300' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType('notes')}
                >
                  Notes
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium border-t border-b ${
                    selectedType === 'book' 
                      ? 'bg-blue-50 text-blue-700 border-blue-300' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType('book')}
                >
                  Books
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                    selectedType === 'project' 
                      ? 'bg-blue-50 text-blue-700 border-blue-300' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType('project')}
                >
                  Projects
                </button>
              </div>
              
              <button
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                title="More filters"
              >
                <Filter size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getTypeColor(product.type)}`}>
                          {getTypeIcon(product.type)}
                          <span className="ml-1">{product.type.charAt(0).toUpperCase() + product.type.slice(1)}</span>
                        </span>
                        {product.condition && (
                          <span className="ml-2 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {product.condition}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-green-600">${product.price}</span>
                    </div>
                    
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-tight">
                      {product.title}
                    </h3>
                    
                    {product.author && (
                      <p className="mt-1 text-sm text-gray-500">
                        Author: {product.author}
                      </p>
                    )}
                    
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <span className="truncate">
                        {product.seller.name} • {product.seller.department}
                      </span>
                      <span className="ml-1 flex items-center text-amber-500">
                        {'★'.repeat(Math.floor(product.seller.rating)) + (product.seller.rating % 1 ? '½' : '')}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleLike(product.id)}
                          className={`p-1.5 rounded-full ${
                            product.isLiked 
                              ? 'text-red-500 hover:bg-red-50' 
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <Heart size={18} fill={product.isLiked ? "currentColor" : "none"} />
                          <span className="sr-only">Like</span>
                        </button>
                        <span className="text-sm text-gray-500 self-center">{product.likes}</span>
                        
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full">
                          <MessageSquare size={18} />
                          <span className="sr-only">Message</span>
                        </button>
                      </div>
                      
                      <Button size="sm">Contact Seller</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any resources matching your search criteria.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setSelectedType(null);
                }}>
                  Clear Filters
                </Button>
                <Button onClick={() => setShowUploadForm(true)}>
                  Upload Resource
                </Button>
              </div>
            </div>
          )}

          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Marketplace Guidelines</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>All resources must be original or properly authorized for resale.</li>
                    <li>No sharing of copyrighted materials without permission.</li>
                    <li>Be respectful and professional in all communications.</li>
                    <li>The university is not responsible for transactions between students.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketplacePage;