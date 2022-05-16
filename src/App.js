import Router from "./config/router/index";
import "../src/theme/theme.css";
import "antd/dist/antd.css";
// import { Provider } from "react-redux";
// import store from "./store/index";

function App() {
  return (
    // <Provider store={store}>
      <Router />
    // </Provider>
  );
}

export default App;
