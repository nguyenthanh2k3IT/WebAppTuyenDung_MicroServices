import { ChildNode } from '@/types/common/layout';
import { useEffect, useState } from 'react';
import { HubConnectionBuilder, HubConnection, HttpTransportType } from '@microsoft/signalr';
import useProfile from '@/hooks/useProfile';
import { getToken } from '@/helpers/storage.helper';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const NotificationProvider: React.FC<ChildNode> = ({ children }) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const { profile } = useProfile();
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const connect = async () => {
            const isRunning = true;
            if (!isRunning) return;

            if (!profile) return;

            if (connection) {
                console.log('Already connected to Notification Hub');
                return;
            }

            console.log('*** SignalR connecting ***');
            const accessToken = getToken();
            const newConnection = new HubConnectionBuilder()
                .withUrl('https://localhost:7001/notification', {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets,
                    accessTokenFactory: () => accessToken || '',
                })
                .withAutomaticReconnect()
                .build();

            newConnection.on('ReceiveNotification', (message: string) => {
                try {
                    const data: NotificationMsg = JSON.parse(message);
                    console.log(data);

                    toast({
                        variant: 'success',
                        title: data.Title,
                        description: data.Content,
                        duration: 3000,
                        className: 'max-w-md',
                        action: data.Navigate ? (
                            <Button
                                onClick={() => navigate(data.Navigate)}
                                variant={'ghost'}
                                className="border border-white text-white"
                            >
                                Go to page
                            </Button>
                        ) : (
                            <></>
                        ),
                    });
                } catch (error) {
                    console.log('JSON convert message error: ', message);
                }
            });

            try {
                await newConnection.start();
                console.log('Connected to Notification Hub');
                setConnection(newConnection); // Lưu trữ kết nối mới
            } catch (error) {
                console.error('Error connecting to Notification Hub: ', error);
            }
        };

        const timeoutId = setTimeout(() => {
            connect();
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
            if (connection) {
                connection.stop();
                console.log('Disconnected from Notification Hub');
                setConnection(null);
            }
        };
    }, [profile]);

    useEffect(() => {
        if (!profile && connection) {
            connection.stop();
            console.log('Disconnected from Notification Hub due to null profile');
            setConnection(null);
        }
    }, [profile, connection]);

    return children;
};

export default NotificationProvider;
