import React from "react";
import { account, logo } from "../../assets";
import {
  ButtonComponent,
  CustomCheckbox,
  InputComponent,
} from "../../components";
import "./css/index.css";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const handleLogin = () => {
    // localStorage.setItem('theme', true);
    navigate("/collections")
  }
  return (
    <div className="red-gradient">
      <div className="container loginContainer py-4">
        <img src={logo} className="logoSize mb-5" />
        <div className="d-flex formMobView" style={{ width: "100%" }}>
          <div className="formContainer me-4">
            <div className="d-flex justify-content-center mb-5">
              <img src={account} alt="" />
              <span className="ms-4 semi-bold fs-5">Sign in</span>
            </div>
            <div className="mb-5">
              <InputComponent placeholder={"E-mail"} />
              <InputComponent password placeholder={"Password"} />
            </div>
            <div className="my-2 d-flex" style={{ alignItems: "center" }}>
              <CustomCheckbox />
              <span className="ms-3 light-grey">
                I agree to <span className="red">BITS’s</span> Terms &
                Conditions
              </span>
            </div>
            <div className="my-2 d-flex" style={{ alignItems: "center" }}>
              <CustomCheckbox />
              <span className="ms-3 light-grey">Remember me</span>
            </div>
            <div className="my-5">
              <ButtonComponent
                onClick={handleLogin}
                text={"LOGIN"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <span>
                Don't have Account? <span className="red cursor">Sign Up</span>
              </span>
            </div>
          </div>
          <div className="formContainer ms-4">
            <div className="d-flex justify-content-center mb-5">
              <img src={account} alt="" />
              <span className="ms-4 semi-bold fs-5">Create Account</span>
            </div>
            <div className="mb-5">
              <InputComponent placeholder={"Full Name"} />
              <InputComponent placeholder={"E-mail"} />
              <InputComponent password placeholder={"Password"} />
              <InputComponent placeholder={"Phone number"} />
            </div>
            <div className="my-2 d-flex" style={{ alignItems: "center" }}>
              <CustomCheckbox />
              <span className="ms-3 light-grey">
                I agree to <span className="red">BITS’s</span> Terms &
                Conditions
              </span>
            </div>
            <div className="my-2 d-flex" style={{ alignItems: "center" }}>
              <CustomCheckbox />
              <span className="ms-3 light-grey">Remember me</span>
            </div>
            <div className="my-5">
              <ButtonComponent
                onClick={handleLogin}
                text={"CREATE ACCOUNT"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <span>
                Already have Account? <span className="red cursor">Login</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
