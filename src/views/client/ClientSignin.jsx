import { useFormik } from "formik";
import { loginuser } from "../../utils/Validation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  generateOtp,
  generateOtp2,
  getOtpValidation,
  login,
  validateOtp,
} from "../../utils/api";
import { useRecoilState } from "recoil";
import { authState } from "../../atom/authAtom";
import { useState } from "react";
import { registerUserAtom } from "../../atom/registrationAtom";

export default function ClientSignin() {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const otpV = false;
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    setLoading(true);
    const { email, password } = values;
    login(email.toLowerCase(), password)
      .then((res) => {
        const payload = {
          // id: res.username,
          sessionID: res.sessionID,
          // role: res.role,
          email: res.username,
        };

        setAuth(res);
        setLoading(false);
        toast.success("Signin Successful");
        navigate("/list-workspace");
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.response.data.msg);
      });
  };

  // Math.random().toString().substr(2, 4)
  const {
    values,
    errors,
    isValid,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: loginuser,
    onSubmit,
  });
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="grid md:grid-cols-2 h-full w-full ">
        <div className=" p-5 flex items-center justify-center">
          <div className="w-full flex flex-col justify-center">
            <Link to="/" className="absolute top-6 font-black  text-[16px]">
              <span className=" bg-black text-white px-3 py-2 rounded mr-2">
                M
              </span>
              Mentor Systems
            </Link>

            <div className="w-[95%] md:w-[90%] lg:w-[60%] mx-auto">
              <h3 className=" font-black text-[20px] lg:text-[30px] leading-[1.1]">
                Welcome back
              </h3>
              <p className="pt-2">Lorem ipsum dolor sit amet. </p>
              <form onSubmit={handleSubmit} className="space-y-2  pt-10">
                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Email</label>
                </span>
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="password"
                    feedback={false}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">Password</label>
                </span>
                {errors.password && touched.password && (
                  <p className="error">{errors.password}</p>
                )}
                <button
                  className="primary__btn mt-5"
                  disabled={!isValid || isSubmitting || loading}
                >
                  {loading ? (
                    <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                  ) : (
                    ""
                  )}
                  Login
                </button>
              </form>
              <div className="flex flex-wrap justify-between">
                <p className=" pt-5 text-sm">
                  {/* Don`t have an account?{" "} */}
                  <Link
                    to="/anonym/request-change-password"
                    className=" cursor-pointer font-bold text-[#F56B3F] "
                  >
                    Forgot password?
                  </Link>
                </p>
                <p className=" pt-5 text-sm">
                  Don`t have an account?{" "}
                  <Link
                    to="/register"
                    className=" cursor-pointer font-bold text-blue-700"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bgSignin hidden  md:flex justify-center items-center w-full "></div>
      </div>
    </div>
  );
}
