import { useEffect, useRef, useState } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { minDate, endOfMonth } from '@/lib/data';
import { X } from 'lucide-react';

type DateRangeCompProps = {
  onRangeChange?: React.Dispatch<
    React.SetStateAction<{
      startDate?: Date;
      endDate?: Date;
    }>
  >;
};

const DateRangeComp = ({ onRangeChange }: DateRangeCompProps) => {
  const [range, setRange] = useState<{
    startDate?: Date;
    endDate?: Date;
    key?: string;
  }>({
    startDate: minDate,
    endDate: new Date(),
    key: 'selection',
  });

  const [open, setOpen] = useState(false);
  const refOne = useRef<HTMLDivElement | null>(null);

  // Set callback to pass range value to parent component
  useEffect(() => {
    if (onRangeChange) onRangeChange(range);
  }, [range, onRangeChange]);

  useEffect(() => {
    // event listeners
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);

    return () => {
      // cleanup event listeners
      document.removeEventListener('keydown', hideOnEscape, true);
      document.removeEventListener('click', hideOnClickOutside, true);
    };
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className='w-[250px]'>
      <div className='relative'>
        <Input
          value={
            range.startDate === minDate
              ? ''
              : `${format(range.startDate ?? 0, 'MMM dd, yyyy')} to ${format(
                  range.endDate ?? 0,
                  'MMM dd, yyyy'
                )}`
          }
          placeholder='All time data until current date'
          readOnly
          onClick={() => setOpen((open) => !open)}
        />

        {range.startDate !== minDate && (
          <X
            onClick={() => {
              setRange({
                startDate: minDate,
                endDate: new Date(),
                key: 'selection',
              });
            }}
            size={18}
            className='text-gray-500 absolute right-2.5 top-2.5 cursor-pointer'
          />
        )}
      </div>

      <div ref={refOne}>
        {open && (
          <DateRangePicker
            onChange={(item: RangeKeyDict) => {
              setRange(item.selection);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={[range]}
            maxDate={endOfMonth}
            minDate={minDate}
            direction='vertical'
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;
