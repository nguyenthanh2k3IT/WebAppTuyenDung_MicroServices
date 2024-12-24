import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { routes } from './routers/index';
import WrapperRouteComponent from './routers/config';

const App: React.FC = () => {
    return (
        <Routes>
            {routes.map((value, index) => {
                const Page = value.page;
                const Layout = value.layout;
                const Middleware = value.middleware;
                const title = value.title ?? '';

                return (
                    <Route element={Middleware ? <Middleware /> : <Outlet />} key={index}>
                        <Route
                            path={value.path}
                            element={
                                <WrapperRouteComponent titleId={title}>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </WrapperRouteComponent>
                            }
                            key={value.path}
                        />
                    </Route>
                );
            })}
        </Routes>
    );
};

export default App;
