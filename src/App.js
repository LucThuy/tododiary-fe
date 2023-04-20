import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import PrivateRoute from './routes';
import { Provider } from 'react-redux';
import store from './store';
function App() {
    return (
        <Provider store={store}>
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
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
