import { toast } from 'sonner';

/**
 * Toast notification utilities
 * Pre-configured for consistent UI across the app
 */

export const toastService = {
  /**
   * Success notification
   * @example toastService.success('Lead created successfully')
   */
  success: (message: string, description?: string) => {
    toast.success(message, { description });
  },

  /**
   * Error notification
   * @example toastService.error('Failed to create lead', 'Please try again')
   */
  error: (message: string, description?: string) => {
    toast.error(message, { description });
  },

  /**
   * Info notification
   * @example toastService.info('Update available')
   */
  info: (message: string, description?: string) => {
    toast.info(message, { description });
  },

  /**
   * Warning notification
   * @example toastService.warning('Rate limit approaching')
   */
  warning: (message: string, description?: string) => {
    toast.warning(message, { description });
  },

  /**
   * Loading notification (long-running operation)
   * @example const id = toastService.loading('Processing...'); toastService.dismiss(id);
   */
  loading: (message: string) => {
    return toast.loading(message);
  },

  /**
   * Dismiss a specific toast or all toasts
   * @example toastService.dismiss(id); toastService.dismiss();
   */
  dismiss: (id?: string | number) => {
    if (id) {
      toast.dismiss(id);
    } else {
      toast.dismiss();
    }
  },

  /**
   * Promise-based toast (for async operations)
   * @example toastService.promise(fetchData(), { loading: 'Loading...', success: 'Done!', error: 'Failed' })
   */
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, {
      loading: options.loading,
      success: options.success,
      error: options.error,
    });
  },
};
