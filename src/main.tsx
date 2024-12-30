import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { reduxStore, persistor } from './redux/store';
import { ThemeProvider } from './components/provider/theme.provider';
import GlobalStyles from './styles/global.style';
import { SheetProvider } from './components/provider/sheet.provider';
import { ModalProvider } from './components/provider/modal.provider';
import TokenProvider from './components/provider/token.provider';
import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
import '../app/globals.css';
import NotificationProvider from './components/provider/notification.provider';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <Provider store={reduxStore}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                        <GlobalStyles>
                            <SheetProvider>
                                <ModalProvider>
                                    <QueryClientProvider client={queryClient}>
                                        <App /> <ReactQueryDevtools initialIsOpen={false} />
                                    </QueryClientProvider>
                                    <Toaster />
                                    <ToastContainer />
                                    <TokenProvider />
                                    <NotificationProvider />
                                </ModalProvider>
                            </SheetProvider>
                        </GlobalStyles>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </Router>
    </React.StrictMode>,
);
