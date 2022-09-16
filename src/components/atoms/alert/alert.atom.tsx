import React from 'react';
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from 'react-icons/fa';
import { toast, TypeOptions } from 'react-toastify';

export const displayIcon = type => {
  switch (type) {
    case 'success':
      return <FaCheck />;
    case 'info':
      return <FaInfo />;
    case 'error':
      return <FaExclamationCircle />;
    case 'warning':
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};
export const dismiss = toast.dismiss;

export const notify = ({ type, message }: { type: TypeOptions; message: string }) =>
  toast[type](message);
