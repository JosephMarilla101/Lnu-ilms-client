import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { MonitorUp, X, PenLine } from 'lucide-react';

interface BookCoverUploaderProps {
  changeHandler: (value: string | undefined) => void;
  value?: string;
  className?: string;
}

const BookCoverUploader: React.FC<BookCoverUploaderProps> = ({
  changeHandler,
  value,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (res) => {
        changeHandler(res.target?.result?.toString() ?? '');
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    } else {
      handleRemoveImage();
    }
  };

  const handleRemoveImage = () => {
    changeHandler(undefined);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={cn('relative', className)}>
      {!value ? (
        <div className='relative bg-gray-100 border-dashed border-2 border-primary h-[200px]'>
          <input
            className='absolute w-full h-full cursor-pointer opacity-0'
            type='file'
            name='img-uploader'
            id={`img-uploader`}
            multiple={false}
            onChange={handleFileChange}
          />

          <div className='h-full flex flex-col items-center justify-center'>
            <MonitorUp size={30} className='text-primary mb-2' />
            <p className='text-center px-4 text-[.9rem] leading-4'>
              Choose a file or drag in here
            </p>
            <span className='text-[.60rem] mt-1'>JPEG, PNG</span>
          </div>
        </div>
      ) : (
        <div
          className='w-full h-full bg-slate-400'
          style={{
            backgroundImage: `url(${value})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <input
            ref={inputRef}
            className='absolute w-full h-full cursor-pointer opacity-0 invisible'
            type='file'
            name='img-uploader'
            id={`img-uploader`}
            multiple={false}
            onChange={handleFileChange}
          />

          <img
            src={value}
            alt='Choosen File'
            className='rounded-lg object-cover w-full h-full'
          />

          <span
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
            className='absolute top-2 right-11 p-[6px] bg-muted rounded-lg cursor-pointer hover:opacity-80'
          >
            <PenLine size={15} />
          </span>

          <span
            onClick={handleRemoveImage}
            className='absolute top-2 right-2 p-[6px] bg-muted rounded-lg cursor-pointer hover:opacity-80'
          >
            <X size={15} />
          </span>
        </div>
      )}
    </div>
  );
};

export default BookCoverUploader;
