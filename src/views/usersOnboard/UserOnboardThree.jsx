import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import ClientHeader from "../client/ClientHeader";
import line from "../../assets/bg/lines.svg";
import { createWorkspaceUser, getProvinces, login } from "../../utils/api";
import { stage2, userOnboard3 } from "../../utils/Validation";
import { useRecoilState, useRecoilValue } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import UserHeader from "./UserHeader";
import { toast } from "react-toastify";
import { authState } from "../../atom/authAtom";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function UserOnboardThree() {
  const params = useParams();
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const [auth, setAuth] = useRecoilState(authState);
  
  const workspaceInfo = useRecoilValue(workspaceStore)
  const navigate = useNavigate();
  const genders = ["male", "female"];
  const onSubmit = async (values) => {
    const { user, ...others } = reg;
    const payload = {
      ...others,
      user: {
        ...values,
        ...user,
      },
    };

    const userPayload = {
        gender: values.gender,
        lastName: reg.user.lastName,
        firstame: reg.user.firstName,
        _role_input: reg.user.role === 'mentor'? true: false,
        mail: reg.user.email,
        workspaceId: params.id,
        _yearsofprofessionalinterest: values.yearsOfExperience,
        _password: reg.user.confirmPassword,
        _phone: reg.user.phone,
        _provinceId: reg.user.province,
        _postalcode: reg.user.postalcode,
        _url: workspaceInfo.inviteLink
        
      };
      createWorkspaceUser(userPayload).then((res)=> {
        toast.success("successful");
        const { email, password } = reg?.user;
        login(email, password).then((res)=> {
          const payload = {
            workspaceId: params.id,
            res,
          }
          setAuth(payload)
          navigate(`/${reg.user.role}-dashboard`);
        })
      })
    setReg(payload);

    navigate(`/user-onboard-3/${params.id}`);
  };

  const initialValues = {
    yearsOfExperience: "",
    gender: "",
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
    validationSchema: userOnboard3,
    onSubmit,
  });

  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <UserHeader />
        <div className=" flex">
          <form onSubmit={handleSubmit} className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="  line h-1 w-10 bg-gray-500"></div>
                <div className="line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-white"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
              </div>
              <div className="steps" data-aos="fade">
                <div className="font-light">{reg?.user?.role} Onboarding</div>
                <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                  Step 3
                </div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className="w-[70%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
                Enter Gender and other details
              </h3>
              <div className="space-y-2 pt-8 w-[60%]">
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <Dropdown
                    id="username"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={genders}
                    className=" !text-black"
                    filter
                  />
                  <label htmlFor="username">Gender</label>
                </span>
                {errors.gender && touched.gender && (
                  <p className="error">{errors.gender}</p>
                )}

                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText
                    id="username"
                    name="yearsOfExperience"
                    value={values.yearsOfExperience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Years Of Experience</label>
                </span>
                {errors.yearsOfExperience && touched.yearsOfExperience && (
                  <p className="error">{errors.yearsOfExperience}</p>
                )}

                <button
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                  disabled={!isValid || isSubmitting}
                >
                  Proceed
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 z-0  h-[70vh]">
              <img className=" h-full w-full object-cover" src={line} alt="" />
            </div>
            <button
              className=" absolute right-20 top-[50%] translate-y-[-50%] arrow"
            >
              <i className="pi pi-angle-right cursor-pointer !text-[60px] p-2"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
