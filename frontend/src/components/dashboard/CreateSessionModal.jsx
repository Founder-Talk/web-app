import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Video, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreateSessionModal = ({ isOpen, onClose, onSuccess, selectedMentor = null }) => {
  const [formData, setFormData] = useState({
    mentorId: '',
    title: '',
    description: '',
    scheduledDate: '',
    duration: 60,
    sessionType: 'video'
  });
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      fetchMentors();
      if (selectedMentor) {
        setFormData(prev => ({ ...prev, mentorId: selectedMentor._id }));
      }
    }
  }, [isOpen, selectedMentor]);

  const fetchMentors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/user/mentors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMentors(data.mentors || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mentorId) {
      newErrors.mentorId = 'Please select a mentor';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Session title is required';
    }
    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Please select a date and time';
    }
    if (formData.duration < 15 || formData.duration > 480) {
      newErrors.duration = 'Duration must be between 15 and 480 minutes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
        setFormData({
          mentorId: '',
          title: '',
          description: '',
          scheduledDate: '',
          duration: 60,
          sessionType: 'video'
        });
        setErrors({});
      } else {
        setErrors({ submit: data.message || 'Failed to create session' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Minimum 30 minutes from now
    return now.toISOString().slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Request 1-on-1 Session
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Mentor Selection */}
                <div>
                  <Label htmlFor="mentorId">Select Mentor</Label>
                  <select
                    id="mentorId"
                    name="mentorId"
                    value={formData.mentorId}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 ${
                      errors.mentorId ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Choose a mentor...</option>
                    {mentors.map((mentor) => (
                      <option key={mentor._id} value={mentor._id}>
                        {mentor.name} - ${mentor.hourlyRate}/hr
                      </option>
                    ))}
                  </select>
                  {errors.mentorId && (
                    <p className="mt-1 text-sm text-red-600">{errors.mentorId}</p>
                  )}
                </div>

                {/* Session Title */}
                <div>
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., React Best Practices"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describe what you'd like to discuss..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                {/* Date and Time */}
                <div>
                  <Label htmlFor="scheduledDate">Date & Time</Label>
                  <Input
                    id="scheduledDate"
                    name="scheduledDate"
                    type="datetime-local"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    min={getMinDateTime()}
                    className={errors.scheduledDate ? 'border-red-500' : ''}
                  />
                  {errors.scheduledDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.scheduledDate}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 ${
                      errors.duration ? 'border-red-500' : ''
                    }`}
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                  )}
                </div>

                {/* Session Type */}
                <div>
                  <Label htmlFor="sessionType">Session Type</Label>
                  <div className="mt-2 space-y-2">
                    {[
                      { value: 'video', label: 'Video Call', icon: Video },
                      { value: 'chat', label: 'Chat', icon: MessageSquare },
                      { value: 'async', label: 'Async (Text-based)', icon: FileText }
                    ].map((type) => (
                      <label key={type.value} className="flex items-center">
                        <input
                          type="radio"
                          name="sessionType"
                          value={type.value}
                          checked={formData.sessionType === type.value}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <type.icon className="w-4 h-4 mr-2" />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    {loading ? 'Creating...' : 'Request Session'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CreateSessionModal; 