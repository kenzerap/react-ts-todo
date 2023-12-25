import React, { Fragment, useEffect, useState } from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck, HiX } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import * as fromReducer from '../../store/reducers';

const ToastMessage: React.FC<{}> = (props) => {
  const [backgroundClass, setBackgroundClass] = useState('');
  const isShowMessage: boolean = useSelector(fromReducer.selectIsShowMessage);
  const message: string = useSelector(fromReducer.selectMessage);
  const messageType: string = useSelector(fromReducer.selectMessageType);

  useEffect(() => {
    if (messageType === 'success') {
      setBackgroundClass('bg-green-100');
    }

    if (messageType === 'error') {
      setBackgroundClass('bg-red-100');
    }
  }, [messageType]);

  return (
    <Fragment>
      {isShowMessage && (
        <Toast className={`z-10 fixed right-0 ${backgroundClass}`}>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            {messageType === 'success' && <HiCheck className="h-5 w-5" />}
            {messageType === 'error' && <HiX className="h-5 w-5" />}
          </div>
          <div className="ml-3 text-sm font-bold">{message}</div>
        </Toast>
      )}
    </Fragment>
  );
};

export default ToastMessage;
