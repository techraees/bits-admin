import Router from "./config/router/index";
import "../src/theme/theme.css";
import "antd/dist/antd.css";
import {Provider} from "react-redux";
import store from "./store/index";
import {useEffect} from "react";
import {Slide, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    useEffect(() => {
        localStorage.removeItem("walletconnect");
        localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }, []);
    return (
        <Provider store={store}>
            <Router/>
            <ToastContainer
                transition={Slide}
            />
        </Provider>
    );
}

export default App;
