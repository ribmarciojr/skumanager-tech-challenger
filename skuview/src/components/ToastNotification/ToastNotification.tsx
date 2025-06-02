import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastNotificationProps {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warn';
    duration?: number;
}

const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warn' = 'success', duration: number = 5000) => {
    switch (type) {
        case 'success':
            toast.success(message, { autoClose: duration });
            break;
        case 'error':
            toast.error(message, { autoClose: duration });
            break;
        case 'info':
            toast.info(message, { autoClose: duration });
            break;
        case 'warn':
            toast.warn(message, { autoClose: duration });
            break;
        default:
            toast(message, { autoClose: duration });
    }
};

const ToastNotification: FC<ToastNotificationProps> = ({
    message,
    type = 'success',
    duration = 5000,
}) => {
    useEffect(() => {
        showToast(message, type, duration);
    }, [message, type, duration]);

    return (
        <div aria-live="polite" role="alert">
            {message}
        </div>
    );
};

export { showToast };
export default ToastNotification;