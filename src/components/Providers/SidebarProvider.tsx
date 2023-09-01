import { useState, useEffect, createContext } from 'react';
import { useMediaQuery } from 'react-responsive';

interface SidebarContextType {
  toggled: boolean;
  collapsed: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setCollapsed(false);
    }
  }, [isDesktop]);

  return (
    <SidebarContext.Provider
      value={{ toggled, setToggled, collapsed, setCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
