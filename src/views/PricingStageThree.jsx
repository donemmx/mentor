import { InputText } from "primereact/inputtext";
import ClientHeader from "./client/ClientHeader";
import { Link } from "react-router-dom";
import line from "../assets/bg/lines.svg";

export default function PricingStageThree() {
  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <div className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
                <div className="  line h-1 w-10 bg-white"></div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className=" w-[50%] font-black text-[20px] lg:text-[35px] leading-[1.2]"
              >
                Great Job Emmanuel 👋. <br /> Please help verify using the otp sent to your email?
              </h3>
              <form className="space-y-6 w-[50%] pt-8">
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText id="username" name="name" />
                  <label htmlFor="username">OTP</label>
                </span>
                <Link
                  to="/pricing"
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                >
                  Verify Otp
                </Link>
              </form>
            </div>
            <div className="absolute top-0 right-0 z-0  h-[70vh]">
              <img className=" h-full w-full object-cover" src={line} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
