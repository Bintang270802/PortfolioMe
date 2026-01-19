import { createPortal } from 'react-dom';
import Toast from './Toast';

const ToastContainer = ({ toasts, onRemoveToast }) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-0 right-0 z-50 p-4 space-y-3 pointer-events-none">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
          style={{
            transform: `translateY(${index * 10}px)`,
            zIndex: 1000 - index
          }}
        >
          <Toast
            {...toast}
            onClose={onRemoveToast}
          />
        </div>
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;