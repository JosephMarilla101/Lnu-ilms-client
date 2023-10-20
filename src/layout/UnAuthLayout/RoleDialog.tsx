import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import undraw_teacher from '@/assets/undraw_teacher.svg';
import undraw_mathematics from '@/assets/undraw_mathematics.svg';
import undraw_reading from '@/assets/undraw_reading.svg';
import { useNavigate } from 'react-router-dom';

type RoleDialogProps = {
  children: React.ReactNode;
};

export default function RoleDialog({ children }: RoleDialogProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(`/register/${url}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[620px] max-h-screen overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-center mt-2'>
            Choose Account Type
          </DialogTitle>
        </DialogHeader>
        <div className='my-3 flex gap-3 flex-wrap justify-evenly'>
          <div
            onClick={() => handleClick('teacher')}
            className='w-[160px] flex flex-col items-center bg-white rounded-lg shadow-md px-2 cursor-pointer hover:scale-105 transition-all ease-in-out'
          >
            <img
              className='h-32 w-32 mt-4 mb-4'
              src={undraw_teacher}
              alt='Teacher Illustration'
            />
            <div className='py-2 font-medium'>Teacher</div>
          </div>

          <div
            onClick={() => handleClick('graduate')}
            className='w-[160px] flex flex-col items-center bg-white rounded-lg shadow-md px-2 cursor-pointer hover:scale-105 transition-all ease-in-out'
          >
            <img
              className='h-32 w-32 mt-4 mb-4'
              src={undraw_mathematics}
              alt='Graduate Illustration'
            />
            <div className='py-2 font-medium'>Graduate</div>
          </div>

          <div
            onClick={() => handleClick('student')}
            className='w-[160px] flex flex-col items-center bg-white rounded-lg shadow-md px-2 cursor-pointer hover:scale-105 transition-all ease-in-out'
          >
            <img
              className='h-32 w-32 mt-4 mb-4'
              src={undraw_reading}
              alt='Undergraduate Illustration'
            />
            <div className='py-2 font-medium'>Undergraduate</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
