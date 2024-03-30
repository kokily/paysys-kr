'use client';

import { ToastContainer } from 'react-toastify';

function ToastWrapper() {
  return (
    <ToastContainer position="top-center" draggable={false} closeOnClick={true} />
  );
}

export default ToastWrapper;
