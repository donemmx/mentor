import { Link, useParams } from "react-router-dom";
import Logo from "../component/logo/Logo";
import AccountCard from '../component/accountCard/AccountCard' 
import blueArrow from '../assets/icons/arrows/blue.svg'
import greenArrow from '../assets/icons/arrows/green.svg'
import mentorIcon from '../assets/icons/account/mentor.svg'
import menteeIcon from '../assets/icons/account/mentee.svg'
import { useRecoilValue } from "recoil";
import { workspaceStore } from "../atom/workspaceAtom";

export default function GeneralSignin() {
  const workspace = useRecoilValue(workspaceStore)
  const params = useParams()
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
    <div className="grid md:grid-cols-2 h-full w-full ">
      <div className=" p-5 flex items-center justify-center">
        <div className="w-full flex flex-col justify-center">
          <Logo />
          <div className="w-[95%] md:w-[90%] lg:w-[60%] mx-auto">
            <h3 className=" font-black text-[20px] lg:text-[30px] leading-[1.1]">
              Sign In
            </h3>
            <p className="pt-2 pb-5 text-sm">Choose one of the cards to proceed. </p>
            <div className=" space-y-3">
             <AccountCard image={mentorIcon}  icon={blueArrow} title='As a mentor' subtitle='Support mentees in achieving their personal and professional goals' link={`/mentor-signin/${params?.id}`}/>
             <AccountCard image={menteeIcon}  icon={greenArrow} title='As a Mentee' subtitle='learn, grow, and develop under the guidance of a knowledgeable mentor'
            link={`/mentee-signin/${params?.id}`}
             />
            </div>
            <p className=" pt-5 text-sm">
              Don`t have an account?{" "}
              <Link to={`/general-signup/${params?.id}`} className=" cursor-pointer font-bold text-blue-700" >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className=" hidden md:block w-full bg-black"></div>
    </div>
  </div>
  )
}
