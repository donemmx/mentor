/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";
import { authState } from "../atom/authAtom";
import { workspaceStore } from "../atom/workspaceAtom";
import { addWorkSpaceStore } from "../atom/addWorkspace";
import { registerUserAtom } from "../atom/registrationAtom";

export default function TopCard({
  links,
  title,
  subtitle,
  homeLink,
  base,
  type,
}) {
  const location = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [userData, setUserData] = useRecoilState(user);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
  const [ addWorkspace, setAddWorkspace ] = useRecoilState(addWorkSpaceStore)
  const [reg, setReg] = useRecoilState(registerUserAtom);

  const logOut = () => {
    toast.success("user logged out successfully");
    setUserData(null)
    setAuth(null);
    setReg(null)
    setWorkspaceData(null);
    setAddWorkspace(null)
    location(`/${base}`);

  };
  return (
    <div className="h-[45vh] w-full" style={{
      backgroundColor: workspaceData?.color ? `#${workspaceData?.color}`: '#0A1010'
    }}>
      <div className="p-5 w-[90%] mx-auto">
        <div className="nav flex text-sm items-center justify-between text-white">
          <Link to={homeLink} className="flex items-center gap-2">
            <i className="pi pi-home"></i>
            Home
          </Link>
          <div className=" flex items-center gap-10">
            {links.map((res) =>
              type ? (
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
              className="bg-[#FF9900] p-3 text-xs rounded"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="text-white relative top-[16vh]">
          <div className="text-[2rem] font-black ">{title}</div>
          <small>{subtitle}</small>
        </div>
      </div>
    </div>
  );
}
