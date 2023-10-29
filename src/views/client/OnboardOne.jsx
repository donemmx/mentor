/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import ClientHeader from "./ClientHeader";
import line from "../../assets/bg/lines.svg";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { stage1 } from "../../utils/Validation";
import Password from "antd/es/input/Password";

export default function OnboardOne() {
  const navigate = useNavigate();
  const [ reg, setReg ] = useRecoilState(registerUserAtom)
  const onSubmit = async (values) => {
    const { user, ...others } = reg
    const payload = {
      ...others,
      user:{
        ...values,
        ...user
      }
    }
    setReg(payload)
    navigate("/onboard-2");
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
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
    initialValues:initialValues,
    validationSchema:stage1,
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
                <div className=" line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
              </div>
              <div className="steps" data-aos="fade">
                <div className="font-light">User Onboarding</div>
                <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                  Step 1
                </div>
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
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">First Name</label>
                </span>
                {errors.firstName && touched.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
              <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText
                    id="username"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Last Name</label>
                </span>
                {errors.lastName && touched.lastName && (
                  <p className="error">{errors.lastName}</p>
                )}


                <span className="p-float-label">
                  <Password
                    id="username"
                    name="password"
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
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="confirmPassword"
                    feedback={false}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">Confirm Password</label>
                </span>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )} 

                <button
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
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
