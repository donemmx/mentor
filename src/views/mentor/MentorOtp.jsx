import React, { useState } from 'react'
import { generateOtp, validateOtp, validateUser } from '../../utils/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../atom/authAtom';
import { registerUserAtom } from '../../atom/registrationAtom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { otpverification } from '../../utils/Validation';
import Logo from '../../component/logo/Logo';
import { InputText } from 'primereact/inputtext';
import { workspaceStore } from '../../atom/workspaceAtom';

export default function MentorOtp() {
    const auth = useRecoilValue(authState);
    const reg = useRecoilValue(registerUserAtom)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const params = useParams();
    const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  
    const onSubmit = async (values) => {
      setLoading(true)
      const payload = {
          otp: values.otp,
          id: reg.user.email.toLowerCase()
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
              navigate(`/user-onboard-1/${params.id}`);
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
          <Logo image={workspace?.logo} id={params.id} />
          <div className="w-[95%] md:w-[90%] lg:w-[60%] mx-auto">
            <h3 className=" font-black text-[20px] lg:text-[30px] leading-[1.1]">
              Let`s create your mentee account
            </h3>
            <p className="pt-2">OTP Verification. </p>
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
                disabled={!isValid || loading}
              >
                {loading ? (
                  <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                ) : (
                  ""
                )}
                Verify Otp
              </button>
            </form>
         
          </div>
        </div>
      </div>
      <div className="bg-black hidden md:block w-full"></div>
    </div>
  </div>
  )
}
