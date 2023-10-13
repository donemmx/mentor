import { Link } from "react-router-dom";
import ClientHeader from "./ClientHeader";
import line from "../../assets/bg/lines.svg";
import { useRecoilValue } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";

export default function OnboardFour() {

  const user = useRecoilValue(registerUserAtom)
  


  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <div className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="  line h-1 w-10 bg-gray-500"></div>
                <div className="line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-white"></div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className=" font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
                Welcome {user?.user?.firstName} {user?.user?.lastName} 🎉.
              </h3>
              <p data-aos="fade-down" data-aos-duration="1700" className="pt-3">
                Next step is your workspace setup
              </p>
              <div className="w-[50%] mt-10">
                <Link
                  to="/create-workspace"
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                >
                  Proceed
                </Link>
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
