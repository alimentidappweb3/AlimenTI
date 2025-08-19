import React from 'react';
import './styles.css';
import { FaBoxOpen } from 'react-icons/fa';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="empty-state-container">
      <FaBoxOpen className="empty-state-icon" />
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyState;
