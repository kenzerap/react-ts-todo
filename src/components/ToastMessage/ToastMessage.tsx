import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal } from 'flowbite-react';
import classes from './ToastMessage.module.css';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

const ToastMessage: React.FC<{
  message: string;
  type: string;
}> = (props) => {
  const [backgroundClass, setBackgroundClass] = useState('');
  useEffect(() => {
    if (props.type === 'success') {
      setBackgroundClass('bg-green-100');
    }

    if (props.type === 'error') {
      setBackgroundClass('bg-red-100');
    }
  }, []);
  return (
    <Toast className={`z-10 fixed right-0 ${backgroundClass}`}>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        {props.type === 'success' && <HiCheck className="h-5 w-5" />}
        {props.type === 'error' && <HiX className="h-5 w-5" />}
      </div>
      <div className="ml-3 text-sm font-bold">{props.message}</div>
    </Toast>
  );
};

export default ToastMessage;
