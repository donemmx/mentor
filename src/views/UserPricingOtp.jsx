/* eslint-disable react/no-unescaped-entities */
import { InputText } from "primereact/inputtext";
import ClientHeader from "./client/ClientHeader";
import line from "../assets/bg/lines.svg";
import { Link, useNavigate } from "react-router-dom";
import { otpverification, stage1 } from "../utils/Validation";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../atom/registrationAtom";
import Password from "antd/es/input/Password";
import { validateOtp, validateUser } from "../utils/api";
import { toast } from "react-toastify";
import { useState } from "react";

export default function UserPricingOtp() {
  const navigate = useNavigate();
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      otp: values.otp,
      id: reg.user.email,
    };

    validateOtp(payload)
      .then((res) => {
        if (res.payload.length === 0) {
          toast.error("Invalid OTP");
          setLoading(false);
          
        } else {
          const userPayload = {
            id: reg.user.email,
          };
          validateUser(userPayload)
            .then((res) => {
              toast.success("OTP validation successful");
              setLoading(false);
              navigate("/pricing");
            })
            .catch((err) => {
              toast.error(err.response.data.msg);
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        setLoading(false);
    });
  };

  const initialValues = {
    otp: "",
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
    initialValues: initialValues,
    validationSchema: otpverification,
    onSubmit,
  });
  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <div className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="  line h-1 w-10 bg-white"></div>
                <div className="line h-1 w-10 bg-gray-500"></div>
              </div>

              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className=" w-[95%] font-black text-[20px] lg:text-[35px] leading-[1.2]"
              >
                👋 Enter OTP to verify your account
              </h3>
              <small className="text-sm">Check email for OTP</small>
              <form onSubmit={handleSubmit} className="space-y-6 w-[80%] pt-8">
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
                  className="primary__btn"
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
            </div>
            <div className="absolute top-0 right-0 z-0  h-[70vh]">
              <img className=" h-full w-full object-cover" src={line} alt="" />
            </div>
            <Link
              to="/onboard-2"
              className=" absolute right-20 top-[50%] translate-y-[-50%] arrow"
            >
              <i className="pi pi-angle-right cursor-pointer !text-[60px] p-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
