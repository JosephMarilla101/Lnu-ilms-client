import { useState, createContext } from 'react';

type ActionType = 'update' | 'delete';

interface TableDialogContextType {
  id?: number;
  action?: ActionType;
  setId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setAction: React.Dispatch<React.SetStateAction<ActionType | undefined>>;
  resetState: () => void;
}

export const TableDialogContext = createContext<TableDialogContextType | null>(
  null
);

interface TableDialogProviderProps {
  children: React.ReactNode;
}

const TableDialogProvider: React.FC<TableDialogProviderProps> = ({
  children,
}) => {
  const [id, setId] = useState<number | undefined>();
  const [action, setAction] = useState<ActionType>();

  const resetState = () => {
    setId(undefined);
    setAction(undefined);
  };

  return (
    <TableDialogContext.Provider
      value={{ id, setId, action, setAction, resetState }}
    >
      {children}
    </TableDialogContext.Provider>
  );
};

export default TableDialogProvider;
