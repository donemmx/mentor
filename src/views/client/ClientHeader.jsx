import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { logout } from "../../utils/api";
import { toast } from "react-toastify";
import { user } from "../../atom/userAtom";
import { registerUserAtom } from "../../atom/registrationAtom";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function ClientHeader() {
  const [auth, setAuth] = useRecoilState(authState);
  const [userData, setUserData] = useRecoilState(user);
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);

  const navigate = useNavigate();
  const signout = () => {
    logout().then((res) => {
      setAuth("");
      setUserData("");
      setWorkspace("");
      toast.success("user logged out successfully");
      navigate("/signin");
    });
  };

  const resetRegistration = () => {
    setReg("");
  };
  return (
    <div className="flex h-[80px] relative z-10 items-center justify-between gap-2">
      <div className="logo top-6 font-black  text-[16px]">
        <span className=" bg-black text-white px-3 py-2 rounded mr-2">M</span>
        Mentor Systems
      </div>
      {auth && auth?.role ? (
        <div className=" flex items-center gap-6 text-sm ">
          <Link to='/list-workspace'>
            Workspace
          </Link>
          <button
            onClick={signout}
            className="p-2 px-4  border bg-black text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className=" flex  items-center gap-6 text-sm ">
          <Link onClick={resetRegistration} to="/user-email">
            Pricing
          </Link>
          <Link
            onClick={resetRegistration}
            to="/signin"
            className="p-2 px-4 border rounded"
          >
            Sign in
          </Link>
          <Link
            onClick={resetRegistration}
            to="/register"
            className="p-2 px-4  border bg-black text-white rounded"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
