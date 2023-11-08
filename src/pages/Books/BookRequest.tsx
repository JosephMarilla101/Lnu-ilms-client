import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  useGetRequestedBook,
  useGetUnreturnedBook,
  useGetBookLateFee,
  useCancelRequest,
} from '@/hooks/useBook';
import { useAuthenticateUser } from '@/hooks/useAuth';
import { format, parseISO, differenceInDays, isAfter } from 'date-fns';
import { X, ImageOff } from 'lucide-react';

const BookRequest = () => {
  const getRequestedBook = useGetRequestedBook();
  const getUnreturnedBook = useGetUnreturnedBook();
  const getBookLateFee = useGetBookLateFee();
  const cancelRequest = useCancelRequest();
  const auth = useAuthenticateUser();

  const handleCancelRequest = (bookId: number) => {
    cancelRequest.mutate({ bookId, userId: auth.data?.id ?? 0 });
  };

  const formatDate = (date?: Date) => {
    if (!date) return;

    return format(parseISO(date.toString()), 'MMM d, yyyy h:mm a');
  };

  const calculateLateFee = (): number => {
    if (getBookLateFee.isLoading || !getBookLateFee.data) return 0;
    if (getUnreturnedBook.isLoading || !getUnreturnedBook.data) return 0;

    const currentDateAndTime = new Date();
    const dateDue = parseISO(getUnreturnedBook.data.dueDate.toString());

    const daysLate = differenceInDays(currentDateAndTime, dateDue);

    let lateFee = 0;
    if (isAfter(currentDateAndTime, dateDue))
      lateFee = lateFee + getBookLateFee.data.initialFee;

    // add the followingDateFee if late for more than 1 day
    if (daysLate >= 1) {
      for (let i = daysLate; i >= 1; i--) {
        lateFee = lateFee + getBookLateFee.data.followingDateFee;
      }
    }

    return lateFee;
  };

  const isDue = (): boolean => {
    if (getUnreturnedBook.isLoading || !getUnreturnedBook.data) return false;

    const currentDateAndTime = new Date();
    const dateDue = parseISO(getUnreturnedBook.data.dueDate.toString());

    if (isAfter(currentDateAndTime, dateDue)) return true;
    else return false;
  };

  if (!getRequestedBook.data && !getUnreturnedBook.data) return;

  if (getUnreturnedBook.data)
    return (
      <div className='mb-4'>
        <h1
          className={`italic font-semibold text-lg ${
            isDue() ? 'text-red-600' : 'text-primary'
          }`}
        >
          Unreturn Book...
        </h1>

        <div className='flex flex-row gap-x-3 cursor-pointer bg-[#fffff7] max-w-lg p-2 rounded-md shadow-md shadow-offset-x-1 shadow-offset-y-1 shadow-opacity-30 shadow-2'>
          <div className='relative w-[170px] h-[220px]'>
            <img
              src={getUnreturnedBook.data?.book.bookCover}
              alt=''
              className='absolute rounded-sm w-full h-full inset-0 object-cover'
            />
            {!getUnreturnedBook.data?.book.bookCover && (
              <ImageOff className='text-primary absolute right-[75px] top-[100px]' />
            )}
          </div>

          <div className='flex-1 mt-1 flex flex-col'>
            <h1 className='text-primary text-lg font-semibold italic leading-6 break-normal'>
              {getUnreturnedBook.data?.book.name}
            </h1>

            <h2 className='mt-2 text-secondary text-lg font-semibold italic leading-4 break-normal'>{`(${getUnreturnedBook.data.book.author.name})`}</h2>

            <span className='mt-3 block text-gray-700 italic'>
              ISBN: {getUnreturnedBook.data?.book.isbn}
            </span>
            <span className='block text-gray-700 italic mb-4'>
              Copies Available: {getUnreturnedBook.data?.book.copies}
            </span>

            <div className='mt-auto grid grid-cols-12 gap-1'>
              <div className='col-span-5 text-gray-700 italic'>Status:</div>
              <div
                className={`col-span-7 font-medium ${
                  isDue() ? 'text-red-600' : 'text-primary'
                }`}
              >
                {`${isDue() ? 'Due' : 'Unreturned'}`}
              </div>

              <div className='col-span-5 text-gray-700 italic'>Due Date:</div>
              <div
                className={`col-span-7 font-medium ${
                  isDue() ? 'text-red-600' : 'text-primary'
                }`}
              >
                {formatDate(getUnreturnedBook.data.dueDate)}
              </div>

              <div className='col-span-5 text-gray-700 italic'>Late Fee:</div>
              <div
                className={`col-span-7 font-medium ${
                  isDue() ? 'text-red-600' : 'text-primary'
                }`}
              >
                {`₱ ${calculateLateFee().toFixed(2)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className='mb-4'>
      <h1
        className={`italic font-semibold text-lg ${
          isDue() ? 'text-red-600' : 'text-primary'
        }`}
      >
        Pending Book Request...
      </h1>

      <div className='relative flex flex-row gap-x-3 cursor-pointer bg-[#fffff7] max-w-lg p-2 rounded-md shadow-md shadow-offset-x-1 shadow-offset-y-1 shadow-opacity-30 shadow-2'>
        <div className='absolute top-0 right-0'>
          <div className='relative'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span
                    onClick={() =>
                      handleCancelRequest(getRequestedBook.data?.book.id ?? 0)
                    }
                    className='absolute top-2 right-2 p-[6px] bg-muted rounded-lg cursor-pointer hover:bg-slate-200'
                  >
                    <X size={20} />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cancel Request</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className='relative w-[170px] h-[220px]'>
          <img
            src={getRequestedBook.data?.book.bookCover}
            alt=''
            className='absolute rounded-sm w-full h-full inset-0 object-cover'
          />
          {!getRequestedBook.data?.book.bookCover && (
            <ImageOff className='text-primary absolute right-[75px] top-[100px]' />
          )}
        </div>

        <div className='flex-1 mt-1 flex flex-col'>
          <h1 className='text-primary text-lg font-semibold italic leading-6 break-normal'>
            {getRequestedBook.data?.book.name}
          </h1>

          <h2 className='mt-2 text-secondary text-lg font-semibold italic leading-4 break-normal'>{`(${getRequestedBook.data?.book.author.name})`}</h2>

          <span className='mt-3 block text-gray-700 italic'>
            ISBN: {getRequestedBook.data?.book.isbn}
          </span>
          <span className='block text-gray-700 italic mb-4'>
            Copies Available: {getRequestedBook.data?.book.copies}
          </span>

          <div className='mt-auto grid grid-cols-12 gap-1'>
            <div className='col-span-5 text-gray-700 italic'>Status:</div>
            <div className='col-span-7 font-medium text-primary'>
              Pending Request
            </div>

            <div className='col-span-5 text-gray-700 italic'>Request Date:</div>
            <div className='col-span-7 font-medium text-primary'>
              {formatDate(getRequestedBook.data?.requestDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRequest;
