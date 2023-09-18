/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import Logo from "../../component/logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { getAllCountries } from "../../services/apiservice";
import line from "../../assets/bg/lines.svg";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";

export default function OnboardThree() {
  const [country, setCountry] = useState(null);
  const countries = ['Canada', 'Others']
  const [ reg, setReg ] = useRecoilState(registerUserAtom);

  const navigate = useNavigate()
  const saveCountry=()=>{
    
    const {user, ...others} = reg

    const payload = {
      ...others, 
      user: {
        ...user,
        country:country
      }
    }

    setReg(payload)
    navigate("/onboard-3")
  }

  return (
        <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <div className="flex h-[80px] relative z-10 items-center justify-between gap-2">
          <div className="logo top-6 font-black  text-[16px]">
            <span className=" bg-black text-white px-3 py-2 rounded mr-2">
              M
            </span>
            Mentor Systems
          </div>
          <div className=" flex items-center gap-6 text-sm ">
            <Link to="/pricing">Pricing</Link>
            <button className="p-2 px-4 border rounded">Sign in</button>
            <button className="p-2 px-4  border bg-black text-white rounded">
              Sign up
            </button>
          </div>
        </div>
        <div className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="  line h-1 w-10 bg-gray-500"></div>
                <div className="line h-1 w-10 bg-white"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
              </div>
              <div className="steps" data-aos="fade">
                <div className="font-light">User Onboarding</div>
                <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                  Step 2
                </div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className="w-full font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
                Select a Country
              </h3>
              <div className="space-y-2 w-full pt-8">
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <Dropdown
                    id="username"
                    name="name"
                    value={country}
                    options={countries}
                    className=" !text-black"
                    filter
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <label htmlFor="username">Country</label>
                </span>

                <button 
                  onClick={saveCountry}
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                  disabled={country===null}
                >
                  Proceed
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 z-0  h-[70vh]">
              <img className=" h-full w-full object-cover" src={line} alt="" />
            </div>
            <Link to='/onboard-3' className=" absolute right-20 top-[50%] translate-y-[-50%] arrow">
              <i className="pi pi-angle-right cursor-pointer !text-[60px] p-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
