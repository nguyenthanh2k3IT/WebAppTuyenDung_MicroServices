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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <TokenProvider>
                <Provider store={reduxStore}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                            <GlobalStyles>
                                <NotificationProvider>
                                    <SheetProvider>
                                        <ModalProvider>
                                            <App />
                                            <Toaster />
                                            <ToastContainer />
                                        </ModalProvider>
                                    </SheetProvider>
                                </NotificationProvider>
                            </GlobalStyles>
                        </ThemeProvider>
                    </PersistGate>
                </Provider>
            </TokenProvider>
        </Router>
    </React.StrictMode>,
);
