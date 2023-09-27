import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error';
import Spinner from './components/Spinner';
import { Toaster } from '@/components/ui/toaster.tsx';
import SidebarProvider from '@/components/Providers/SidebarProvider';
import TableDialogProvider from '@/components/Providers/TableDialogProvider';

const queryClient = new QueryClient();
// Test deploy

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <BrowserRouter>
            <SidebarProvider>
              <TableDialogProvider>
                <App />
                <Toaster />
              </TableDialogProvider>
            </SidebarProvider>
          </BrowserRouter>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
