import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, NotFoundRoute } from './routes';
import PrivateRoute from './routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <route.layout>
                                                <route.component />
                                            </route.layout>
                                        }
                                    />
                                );
                            })}
                            {privateRoutes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <PrivateRoute>
                                                <route.layout>
                                                    <route.component />
                                                </route.layout>
                                            </PrivateRoute>
                                        }
                                    />
                                );
                            })}
                            <Route path="*" element={<NotFoundRoute />} />
                        </Routes>
                    </div>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
