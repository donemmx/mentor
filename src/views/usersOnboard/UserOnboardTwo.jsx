import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import line from "../../assets/bg/lines.svg";
import { getProfAreasByWorkSpace, getProfAreasByWorkSpaceAll, getProvinces } from "../../utils/api";
import { stage2 } from "../../utils/Validation";
import { useRecoilState, useRecoilValue } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import UserHeader from "./UserHeader";
import { authState } from "../../atom/authAtom";

export default function UserOnboardTwo() {
    const [ province, setProvince ] = useState([])
    const [ professionalArea, setProfessionalArea ] = useState([])
    const params = useParams()
    const [ reg, setReg ] = useRecoilState(registerUserAtom)
    const navigate = useNavigate();
    const [ profAreasByWorkSpace, setProfAreasByWorkSpace ] = useState(null)
    const auth = useRecoilValue(authState)    

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
      
      console.log(params, 'params')
      console.log(params.id, 'params.id')
      console.log(user, 'user')
      console.log(reg, 'reg')
      console.log(others, 'others')
      console.log(payload, 'payload')
      console.log(auth, 'auth')
      console.log(auth?.sessionID)
      navigate(`/user-onboard-3/${params.id}`);
    };
  
    const getProAreas = () =>{
      const payload = {
        id:params.id
      }
      getProfAreasByWorkSpaceAll(payload).then((res)=>{
        setProfessionalArea(res.payload)
      })
      console.log(professionalArea, ' the professional Area')
    }
  
    useEffect(()=>{
      getProvinces().then((res)=>{
        setProvince(res.payload)
      })
      getProAreas()
    }, [])
  
    const initialValues = {
      professionalArea: "",
      province: "",
      phone: "",
      postalcode: "",
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
      validationSchema:stage2,
      onSubmit,
    });
  
    return (
      <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
        <div className="grid h-full w-[90%] mx-auto ">
         <UserHeader/>
          <div className=" flex">
            <div className="">
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
                    Step 2
                  </div>
                </div>
                <h3
                  data-aos="fade-down"
                  data-aos-duration="1500"
                  className="w-[70%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
                >
                  Enter Province and other details
                </h3>
                <form onSubmit={handleSubmit} className="space-y-2 pt-8 w-[60%]">
                  <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="p-float-label"
                  >
                    <Dropdown
                      id="username"
                      name="professionalArea"
                      value={values.professionalArea}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={professionalArea}
                      className=" !text-black"
                      filter
                    />
                    <label htmlFor="username">Professionl Areas</label>
                  </span>
                  {errors.professionalArea && touched.professionalArea && (
                    <p className="error">{errors.professionalArea}</p>
                  )}
  
                  <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="p-float-label"
                  >
                    <Dropdown
                      id="username"
                      name="province"
                      value={values.province}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={province}
                      optionValue="Province"
                      optionLabel="Province"
                      className=" !text-black"
                      filter
                    />
                    <label htmlFor="username">Provinces</label>
                  </span>
                  {errors.province && touched.province && (
                    <p className="error">{errors.province}</p>
                  )}
  
                  {/* <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="p-float-label"
                  >
                    <InputText 
                    id="username" 
                    name="professionalArea" 
                    value={values.professionalArea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <label htmlFor="username">professionalArea</label>
                  </span>
                  {errors.professionalArea && touched.professionalArea && (
                    <p className="error">{errors.professionalArea}</p>
                  )} */}
                  <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="p-float-label"
                  >
                    <InputText 
                    id="username" 
                    name="phone" 
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                  </span>
                    <label htmlFor="username">Phone Number</label>
                  {errors.phone && touched.phone && (
                    <p className="error">{errors.phone}</p>
                  )}
                  <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="p-float-label"
                  >
                    <InputText 
                    id="username" 
                    name="postalcode" 
                    value={values.postalcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <label htmlFor="username">Postal Code</label>
                  </span>
                  {errors.postalcode && touched.postalcode && (
                    <p className="error">{errors.postalcode}</p>
                  )}
  
                  <button
                    data-aos="fade-down"
                    data-aos-duration="800"
                    className="primary__btn"
                    disabled={!isValid || isSubmitting}
                  >
                    Proceed
                  </button>
                </form>
              </div>
              <div className="absolute top-0 right-0 z-0  h-[70vh]">
                <img className=" h-full w-full object-cover" src={line} alt="" />
              </div>
              <Link
                to="/onboard-4"
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
  