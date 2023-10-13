import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { logout } from "../../utils/api";
import { toast } from "react-toastify";
import { user } from "../../atom/userAtom";
import { registerUserAtom } from "../../atom/registrationAtom";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function UserHeader() {
  const [auth, setAuth] = useRecoilState(authState);
  const [userData, setUserData] = useRecoilState(user);
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const workspace = useRecoilValue(workspaceStore);

  const navigate = useNavigate();
  const params = useParams()
  const signout = () => {
    logout().then((res) => {
      setAuth("");
      setUserData("");
      toast.success("user logged out successfully");
      navigate(`/${reg.user.role}-signin/${params.id}`);
    });
  };

  const resetRegistration = () => {
    setReg("");
  };
  return (
    <div className="flex h-[80px] relative z-10 items-center justify-between gap-2">
      <Link
      to={`/workspace-landing/${params?.id}`}
      className="logo  top-6 font-black text-[16px]"
    >
      {workspace && workspace?.logo ? (
        <div className="flex items-center gap-4">
            <div className="  h-[40px]">
              <img src={workspace?.logo} alt="" className="h-full w-full object-contain" />
            </div>
              <p>{workspace?.name}</p>
        </div>
      ) : (
        <span className=" bg-black text-white px-3 py-2 rounded mr-2">
          Logo
        </span>
      )}
    </Link>
      {auth && auth?.role ? (
        <div className=" flex items-center gap-6 text-sm ">
          <Link to="/list-workspace">Workspace</Link>
          <button
            onClick={signout}
            className="p-2 px-4  border bg-black text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className=" flex items-center gap-6 text-sm ">
          <Link
            onClick={resetRegistration}
            to={`/workspace-landing/${params.id}`}
            className="p-2 px-4  text-white rounded"
          >
          <i className="pi pi-home"></i>  Home
          </Link>
        </div>
      )}
    </div>
  );
}
