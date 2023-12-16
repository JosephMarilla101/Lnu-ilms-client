import { useState, createContext } from 'react';
import type { RequestStatusType } from '@/hooks/useBook';

interface BookRequestContextType {
  id?: number;
  bookId?: number;
  userId?: number;
  action: RequestStatusType | undefined;
  setId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setBookId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setAction: React.Dispatch<
    React.SetStateAction<RequestStatusType | undefined>
  >;
  resetState: () => void;
}

export const BookRequestContext = createContext<BookRequestContextType | null>(
  null
);

interface BookRequestProviderProps {
  children: React.ReactNode;
}

const BookRequestProvider: React.FC<BookRequestProviderProps> = ({
  children,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [bookId, setBookId] = useState<number | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [action, setAction] = useState<RequestStatusType | undefined>(
    undefined
  );

  const resetState = () => {
    setId(undefined);
    setBookId(undefined);
    setUserId(undefined);
    setAction(undefined);
  };

  return (
    <BookRequestContext.Provider
      value={{
        id,
        bookId,
        userId,
        setId,
        setBookId,
        setUserId,
        action,
        setAction,
        resetState,
      }}
    >
      {children}
    </BookRequestContext.Provider>
  );
};

export default BookRequestProvider;
