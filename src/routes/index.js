import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Play from "../pages/Play";
import { persistor, store } from "../redux/store";

const Routers = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Routes>
                        {/* <Route
                            path="/"
                            element={
                                <ProtectingRoute>
                                    <Home />
                                </ProtectingRoute>
                            }
                        /> */}
                        <Route
                            path="/"
                            element={
                                <Home />
                            }
                        />
                        <Route
                            path="/menu"
                            element={
                                <Menu />
                            }
                        />
                        <Route
                            path="/play"
                            element={
                                <Play />
                            }
                        />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default Routers;