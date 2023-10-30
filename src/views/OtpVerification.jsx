import { useFormik } from "formik";
import { loginuser, otpverification } from "../utils/Validation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { generateOtp,  validateOtp, validateUser } from "../utils/api";
import {  useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import {  useState } from "react";
import { registerUserAtom } from "../atom/registrationAtom";

export default function OtpVerification() {
  const auth = useRecoilValue(authState);
  const reg = useRecoilValue(registerUserAtom)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setLoading(true)
    const payload = {
        otp: values.otp,
        id: reg.user.email
      }

      validateOtp(payload).then((res)=>{
        if (res.payload.length === 0 ){
          toast.error('Invalid OTP')
        } else {
          const userPayload = {
        id: reg.user.email
          }
          validateUser(userPayload).then((res)=>{
            toast.success("OTP validation successful")
            navigate("/pricing");
          })
        }
      setLoading(false)
    
  }).catch((err)=> {
    toast.error(err.response.data.msg);
  })};
  const regenerateOtp = ()=>{
    setLoading(true);
    const payload = {
      email:reg.user.email
    }
    generateOtp(payload).then((res) => {
      toast.success('Check your email for new OTP')
      // navigate("/otpverification");
    }).catch((err)=> {
      toast.error(err.response.data.msg);

    })
    setLoading(false);
  }

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
              
              <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText
                    id="username"
                    name="otp"
                    keyfilter="int" 
                    className=" !tracking-[20px] !text-center !font-bold !text-4xl"
                    value={values.otp}
                    maxLength={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">OTP</label>
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
                  Validate OTP
                </button>
              </form>
              <div className="flex flex-wrap justify-between">
                <p className=" pt-5 text-sm">
                  {/* Don`t have an account?{" "} */}
                  <Link
                    to="/anonym/request-change-password"
                    className=" cursor-pointer font-bold text-[#F56B3F] "
                  >
                    Sign In?
                  </Link>
                </p>
                <button onClick={regenerateOtp} className="btn btn-gray-200 border mt-2 p-3 rounded-lg text-sm">
                  Re-Generate OTP{" "}
                  {/* <Link
                    to="/register"
                    className=" cursor-pointer font-bold text-blue-700"
                  >
                    Sign up
                  </Link>  */}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bgSignin hidden  md:flex justify-center items-center w-full "></div>
      </div>
    </div>
  );
}
