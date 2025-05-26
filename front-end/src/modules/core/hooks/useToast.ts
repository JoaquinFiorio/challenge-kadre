import toast from 'react-hot-toast';

type ToastType =
    | 'success'
    | 'error'

export const useToast = () => {

    const showToast = (title: string, text: string, type: ToastType, duration: number = 3000) => {
        switch (type) {
            case 'success':
                return toast.success(`${title} ${text}`, { duration });

            case 'error':
                return toast.error(`${title} ${text}`, { duration });
        }
    };

    return { showToast }
}