import Router from "./config/router/index";
import "../src/theme/theme.css";
import { Provider } from "react-redux";
import store from "./store/index";
import img from "./assets/images/help.png";
import "./App.css";
import ZendeskComp from "./containers/zendesk";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    // localStorage.clear()
  }, []);

  return (
    <Provider store={store}>
      <Router />
      <ZendeskComp showChat={showChat} />
      <div
        className="img-wrapper"
        onClick={() => {
          setShowChat(!showChat);
        }}
      >
        <img src={img} />
      </div>
    </Provider>
  );
}

export default App;
