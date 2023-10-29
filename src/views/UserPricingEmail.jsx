/* eslint-disable react/no-unescaped-entities */
import { InputText } from "primereact/inputtext";
import ClientHeader from "./client/ClientHeader";
import line from "../assets/bg/lines.svg";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, stage1 } from "../utils/Validation";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../atom/registrationAtom";
import Password from "antd/es/input/Password";
import { checkIfUserExist, checkUser, generateOtp } from "../utils/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function UserPricingEmail() {
  const navigate = useNavigate();
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      user: {
        ...values,
      },
    };
    setReg(payload);
    const emailData = {
      email: values.email,
    };
    const checkEmail = {
      id: values.email,
    };

    checkUser(checkEmail)
      .then((res) => {
        setLoading(false);

        if (res?.payload.length === 0 || res.payload[0].isVerified === false) {
          generateOtp(emailData).then((res) => {
            navigate("/user-otp");
          });
        } else {
          checkIfUserExist({ email: values.email })
            .then((res) => {
              setLoading(false);
              if (res.payload.length === 1) {
                toast.error("User already exists. Please login");
              } else {
                navigate("/user-otp");
              }
            })
            .catch((err) => {
              setLoading(false);
              toast.error(err.response.data.msg);
            });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.msg);
      });
  };

  const initialValues = {
    email: "",
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
    validationSchema: registerUser,
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
                👋 Let's start with basic information
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6 w-[80%] pt-8">
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
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
                <button
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                  disabled={!isValid || isSubmitting || loading}
                >
                  {loading ? (
                    <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                  ) : (
                    ""
                  )}
                  Proceed
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
