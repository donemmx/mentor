import { InputText } from "primereact/inputtext";
import Logo from "../../component/logo/Logo";
import { Link } from "react-router-dom";

export default function ClientOtp() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="grid md:grid-cols-2 h-full w-full ">
        <div className=" p-5 flex items-center justify-center">
          <div className="w-full flex flex-col justify-center">
            <Logo />
            <div className="w-[95%] md:w-[90%] lg:w-[60%] mx-auto">
              <h3 className=" font-black text-[20px] lg:text-[30px] leading-[1.1]">
                Enter Otp
              </h3>
              <p className="pt-2">Please check your email for code </p>
              <form className="space-y-2  pt-10">
                <span className="p-float-label">
                  <InputText  id="username" name="otp" />

                  <label htmlFor="username">OTP</label>
                </span>

                <Link to='/pricing' className="primary__btn mt-5">Verify Otp</Link>
              </form>
            
            </div>
          </div>
        </div>
        <div className=" hidden md:block w-full bg-black"></div>
      </div>
    </div>
  );
}
