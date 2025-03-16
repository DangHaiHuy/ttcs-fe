import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { privateROutes, publicRoutes } from './routes';
import NoLayOut from './Layouts/NoLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicWrap from './components/publicWrap/publicWrap';
import PrivateWrap from './components/privateWrap/PrivateWrap';
import AdminWrap from './components/admin/adminwrap/AdminWrap';

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = NoLayOut;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PublicWrap>
                                            <Layout>
                                                <route.component />
                                            </Layout>
                                        </PublicWrap>
                                    }
                                ></Route>
                            );
                        })}
                        {privateROutes.map((route, index) => {
                            let Layout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = NoLayOut;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PrivateWrap>
                                            {route.isAdminEndpoint ? (
                                                <AdminWrap>
                                                    <Layout>
                                                        <route.component />
                                                    </Layout>
                                                </AdminWrap>
                                            ) : (
                                                <Layout>
                                                    <route.component />
                                                </Layout>
                                            )}
                                        </PrivateWrap>
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </>
    );
}

export default App;
