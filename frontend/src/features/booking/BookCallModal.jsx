import React, { useState } from 'react';
import './BookCallModal.css'; // Optional: for custom styles

const BookCallModal = ({ isOpen, onClose, onSendRequest, mentorName }) => {
  const [reason, setReason] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [duration, setDuration] = useState(60);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleReasonChange = (e) => {
    if (e.target.value.length <= 16) {
      setReason(e.target.value);
      setError('');
    } else {
      setError('Reason must be 16 characters or less.');
    }
  };

  const handleSend = () => {
    if (!reason.trim()) {
      setError('Reason is required.');
      return;
    }
    if (!scheduledDate) {
      setError('Please select a date and time.');
      return;
    }
    if (!duration || duration < 15 || duration > 480) {
      setError('Duration must be between 15 and 480 minutes.');
      return;
    }
    onSendRequest({ reason, scheduledDate, duration });
    setReason('');
    setScheduledDate('');
    setDuration(60);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Book a Session with {mentorName || 'Mentor'}</h2>
        <label htmlFor="reason">Reason for booking (max 16 chars):</label>
        <textarea
          id="reason"
          value={reason}
          onChange={handleReasonChange}
          maxLength={16}
          rows={2}
          placeholder="Enter reason..."
        />
        <div className="char-count">{reason.length}/16</div>
        <label htmlFor="scheduledDate">Date & Time:</label>
        <input
          id="scheduledDate"
          type="datetime-local"
          value={scheduledDate}
          onChange={e => setScheduledDate(e.target.value)}
        />
        <label htmlFor="duration">Duration (minutes):</label>
        <input
          id="duration"
          type="number"
          min={15}
          max={480}
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
        />
        {error && <div className="error-message">{error}</div>}
        <button className="send-request-btn" onClick={handleSend} disabled={!reason.trim() || !scheduledDate || !duration}>
          Send Request
        </button>
      </div>
    </div>
  );
};

export default BookCallModal;
