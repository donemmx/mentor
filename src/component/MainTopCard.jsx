/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import mentor from "../assets/icons/account/mentor.svg";
import mentee from "../assets/icons/account/mentee.svg";
import time from "../assets/icons/account/time.svg";
import line from "../assets/bg/lines.svg";
import { logout } from "../utils/api";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import { user } from "../atom/userAtom";
import { registerUserAtom } from "../atom/registrationAtom";
import { workspaceStore } from "../atom/workspaceAtom";

export default function MainTopCard({
  links,
  title,
  subtitle,
  homeLink,
  logo,
  type,
  workspaceColor,
  invites,
}) {
  const [auth, setAuth] = useRecoilState(authState);
  const [userData, setUserData] = useRecoilState(user);
  const workspaceData = useRecoilValue(workspaceStore)
  const [reg, setReg] = useRecoilState(registerUserAtom);

  const navigate = useNavigate();
  const signout = () => {
    logout().then((res) => {
      if(auth.role === 'owner'){
        navigate(`/signin`);
      }
      else if(auth?.role !== 'owner'){
        navigate(`/${type}-signin/${workspaceData?.workspace}`);
      }
      setAuth("");
      setUserData('')
      setReg('')
      toast.success("user logged out successfully");
    });
  };
  return (
    <div className=" h-[75vh] w-full" style={{
      backgroundColor:  workspaceData?.color ? workspaceData?.color : 'black'
    }}>
      <div className="p-5 w-[90%] mx-auto">
        <div className="nav flex text-sm items-center justify-between text-white">
          <Link to={homeLink} className="flex items-center gap-2">
            <i className="pi pi-home"></i>
            Home
          </Link>
          <div className=" flex items-center gap-10">
            {links.map((res) =>
              auth?.role !== "owner" ? (
                <Link to={`/${type}-${res}`} key={res}>
                  {res}
                </Link>
              ) : (
                <Link to={`/${res}`} key={res}>
                  {res}
                </Link>
              )
            )}
            <i className="pi pi-bell"></i>
            <button
              onClick={signout}
              className="bg-[#FF9900] p-3 text-xs rounded"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="text-white relative top-[16vh]">
          <div className="absolute top-[-80px] right-0 z-0  h-[50vh]">
            <img className=" h-full w-full object-cover" src={line} alt="" />
          </div>
         {logo && logo.length > 0 ? <div className="h-[300px] w-[300px] absolute top-[0%] right-0">
            <img src={logo} alt="" className="w-full h-full object-contain" />
          </div> : ''}
          <div className="text-[1.4rem] pb-2 font-black ">
            {type.toUpperCase()} DASHBOARD
          </div>
          <div className="text-[2rem] font-black ">{title}</div>
          <small>{subtitle}</small>
          {auth?.role === "owner" ? (
            <div className="mt-10">
              <p>Overview</p>
              <div className="flex items-center gap-[8vw] mt-[7vh]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded w-[100px] h-[100px] p-5 " style={{
                    backgroundColor: workspaceColor,
                    filter: `brightness(.9)`

                  }}>
                    <img src={time} alt="" className="p-3" />
                  </div>
                  <div className="">
                    <p className="text-sm">Hours Spent</p>
                    <div className="measure text-[30px]">10h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded w-[100px] h-[100px] p-5 " style={{
                    backgroundColor: workspaceColor,
                    filter: `brightness(.9)`

                  }}>
                    <img src={mentor} alt="" className="p-3" />
                  </div>
                  <div className="">
                    <p className="text-sm">No. of Mentors</p>
                    <div className="measure text-[30px]">24</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded w-[100px] h-[100px] p-5 " style={{
                    backgroundColor: workspaceColor,
                    filter: `brightness(.9)`
                  }}>
                    <img src={mentee} alt="" className="p-3" />
                  </div>
                  <div className="">
                    <p className="text-sm">No. of Mentees</p>
                    <div className="measure text-[30px]">4</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <p>Overview</p>
              <div className="flex items-center gap-[8vw] mt-[7vh]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded w-[100px] h-[100px] p-5 bg-[#1B1B1B]">
                    <img src={time} alt="" className="p-3" />
                  </div>
                  <div className="">
                    <p className="text-sm">Hours Spent</p>
                    <div className="measure text-[30px]">10h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded w-[100px] h-[100px] p-5 bg-[#1B1B1B]">
                    <img src={invites} alt="" className="p-3" />
                  </div>
                  <div className="">
                    <p className="text-sm">Invites</p>
                    <div className="measure text-[30px]">10h</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
