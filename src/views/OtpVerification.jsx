import { useFormik } from "formik";
import { loginuser, otpverification } from "../utils/Validation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { generateOtp, login } from "../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import { useEffect, useState } from "react";

export default function OtpVerification() {
  const auth = useRecoilValue(authState);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  console.log('this is the otp page');
  const onSubmit = async (values) => {
    setLoading(true)
    const { email, password } = values;
    // login(email, password)
    //   .then((res) => {
    //     setAuth(res);
    //     navigate("/list-workspace");
    //     toast.success("Signin Successful");
    //     setLoading(false)
    //   })
    //   .catch((e) => {
    //     setLoading(false)
    //     toast.error(e.response.data.msg);
    //   });
  };

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
      otp: "",
    },
    validationSchema: otpverification,
    onSubmit,
  });

  useEffect(()=>{
    generateOtp(auth.username).then((res)=>{
        console.log(res, 'the res from validate')
    })

  }, [])
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="grid md:grid-cols-2 h-full w-full ">
        <div className=" p-5 flex items-center justify-center">
          <div className="w-full flex flex-col justify-center">
            <Link to='/' className="absolute top-6 font-black  text-[16px]">
              <span className=" bg-black text-white px-3 py-2 rounded mr-2">
                M
              </span>
              Mentor Systems
            </Link>

            <div className="w-[95%] md:w-[90%] lg:w-[60%] mx-auto">
              <h3 className=" font-black text-[20px] lg:text-[30px] leading-[1.1]">
              OTP - Verification page
              </h3>
              {/* <p className="pt-3 text-2x font-bold">OTP - Verification page</p> */}
              <p className="pt-2">Check your email for OTP sent. </p>
              <form onSubmit={handleSubmit} className="space-y-2  pt-10">
                {/* <span className="p-float-label">
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
                )} */}
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="otp"
                    feedback={false}
                    value={values.otp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">Enter OTP</label>
                </span>
                {errors.otp && touched.otp && (
                  <p className="error">{errors.otp}</p>
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
                    Log Out?
                  </Link>
                </p>
                {/* <p className=" pt-5 text-sm">
                  Click here to ?{" "}
                  <Link
                    to="/register"
                    className=" cursor-pointer font-bold text-blue-700"
                  >
                    Sign up
                  </Link> 
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bgSignin hidden  md:flex justify-center items-center w-full "></div>
      </div>
    </div>
  );
}
