import { InputText } from "primereact/inputtext";
import ClientHeader from "./client/ClientHeader";
import { Link, useNavigate } from "react-router-dom";
import line from "../assets/bg/lines.svg";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../atom/registrationAtom";
import { v4 } from "uuid";

export default function PricingStageTwo() {
  const navigate = useNavigate();
  const [ reg, setReg ] = useRecoilState(registerUserAtom)

  const [email, setEmail] = useState()
  const onSubmit = async (values) => {
    const { user, ...others } = reg
    const payload = {
      ...others,
      user:{
        email: email,
        password: v4(),
        ...user
      }
    }
    setReg(payload)
    navigate("/onboard-2");
  };
  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <div className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="line h-1 w-10 bg-gray-500"></div>
                <div className="  line h-1 w-10 bg-white"></div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className=" w-full font-black text-[20px] lg:text-[35px] leading-[1.2]"
              >
                Thank you {`${reg?.user?.firstName} ${reg?.user?.lastName}`} 👋. <br /> Can we have your email?
              </h3>
              <div className="space-y-6 w-[80%] pt-8">
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText id="username" name="name" value={email} onChange={(e)=> setEmail(e.target.value)} />
                  <label htmlFor="username">Email</label>
                </span>
                <button
                  onClick={onSubmit}
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                  disabled={!email}
                >
                  Proceed
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 z-0  h-[70vh]">
              <img className=" h-full w-full object-cover" src={line} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
