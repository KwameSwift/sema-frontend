import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import RegisterFirstStep from "./firstStep";
import RegisterSecondStep from "./secondStep";
import CustomButton from "../../../Components/Common/CustomButton";
import { axiosClient } from "../../../libs/axiosClient";
import { isRequiredFieldsPassed } from "../../../utils/helpers";
import SocialLoginButtons from "../../../Components/SocialLoginButtons";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../Redux/slices/userSlice";
import logo from "../../../Assets/images/logo-small.png"
import { toast } from "react-toastify";

function SignupPage() {
  const [userType, setUserType] = useState("Guest");
  const [progress, setProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [requiredFieldsLength, setRequiredFieldsLength] = useState(3);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({});

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async () => {
    setLoading(true);
    const response = await axiosClient.post("auth/register/", { ...state });
    const data = response.data.data;
    const payload = {
      tokens: {
        access: data.access_token,
        refresh: data.refresh_token,
      },
      user: data?.user,
    };
    dispatch(setUserData(payload));
    setLoading(false);
    toast.success("Registration successful");
    await new Promise(r => setTimeout(r, 2000));
    navigate("/");
  };

  const handleSubmit = async () => {
    try {
      if (userType === "Content Creator") {
        setProgress(1);
        setRequiredFieldsLength(8);
      } else {
        createUser();
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.detail);
    }
  };

  const changeUserType = (status) => {
    setUserType(status);
  };

  useEffect(() => {
    setBtnDisabled(!isRequiredFieldsPassed(state, requiredFieldsLength, "eq"));
  }, [state, progress]);

  return (
    <div className="auth-login">
      <AuthSidebar />
      <div className={`login-content ${progress && 'more-details'}`}>
        <div className="content-wrapper">
          <div className='logo-sect'>
            <img src={logo} className='logo' alt="sema logo"/>
            <h1 className='company-header'>SEMA</h1>
          </div>
          <div className="head-sect">
            <h1>{progress ? "Let's setup your account!" : "Sign up!"}</h1>
            {progress === 1 && (
              <p>
                <span className="sema">SEMA</span> needs more information from
                you.
              </p>
            )}
            <SocialLoginButtons />
          </div>
          <div className="input-group">
            {!progress ? (
              <RegisterFirstStep handleChange={handleChange} />
            ) : (
              <RegisterSecondStep handleChange={handleChange} />
            )}
            {progress === 0 && (
              <div className="row user-type-sect">
                <div
                  className={`type-item ${
                    userType === "Guest" ? "selected" : ""
                  }`}
                  onClick={() => changeUserType("Guest")}
                >
                  Guest
                </div>
                <div
                  className={`type-item ${
                    userType === "Content Creator" ? "selected" : ""
                  }`}
                  onClick={() => changeUserType("Content Creator")}
                >
                  Content Creator
                </div>
              </div>
            )}
          </div>
          <div className="submit-btn">
            <CustomButton
              type="button"
              onClick={progress ? createUser : handleSubmit}
              loading={loading}
              disabled={loading || btnDisabled}
              text={
                userType === "Content Creator" && !progress ? "Next" : "Sign up"
              }
            />
          </div>
          <div className="auth-bottom-text">
            <span onClick={() => navigate("/login")}>
              Already have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
