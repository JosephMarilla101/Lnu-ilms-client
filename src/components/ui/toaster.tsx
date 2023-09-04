import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, AlertOctagon } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1 w-full'>
              <div className='flex flex-row items-center'>
                <div className='mr-3 text-2xl'>
                  {variant === 'default' && (
                    <CheckCircle className='text-green-500' />
                  )}
                  {variant === 'destructive' && (
                    <AlertOctagon className='text-destructive' />
                  )}
                </div>

                <div className='flex flex-col'>
                  {title && (
                    <ToastTitle
                      className={
                        variant === 'default'
                          ? 'text-green-500'
                          : 'text-destructive'
                      }
                    >
                      {title}
                    </ToastTitle>
                  )}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
