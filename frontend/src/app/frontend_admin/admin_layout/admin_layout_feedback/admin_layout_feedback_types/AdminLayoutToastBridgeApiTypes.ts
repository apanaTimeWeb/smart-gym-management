import { toast } from 'react-hot-toast';
export type ToastBridgeApi = {
  success: typeof toast.success;
  error: typeof toast.error;
}
