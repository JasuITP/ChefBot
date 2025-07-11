
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SnackbarType } from '../types';
import Icon from './Icon';

const Snackbar: React.FC = () => {
  const { snackbar } = useAppContext();

  if (!snackbar.isOpen) {
    return null;
  }

  const baseClasses = 'fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 transition-all duration-300';
  const typeClasses = {
    [SnackbarType.SUCCESS]: 'bg-green-600',
    [SnackbarType.ERROR]: 'bg-red-600',
  };

  const iconName = {
      [SnackbarType.SUCCESS]: 'check_circle',
      [SnackbarType.ERROR]: 'error',
  }

  return (
    <div className={`${baseClasses} ${typeClasses[snackbar.type]} ${snackbar.isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <Icon name={iconName[snackbar.type]} />
      <span>{snackbar.message}</span>
    </div>
  );
};

export default Snackbar;
