import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { logout } from "../../utils/api";
import { toast } from "react-toastify";

export default function ClientHeader() {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate  = useNavigate()
  const signout = () => {
    logout().then((res)=> {
      setAuth('')
      toast.success('user logged out successfully')
    })
  }
  return (
    <div className="flex h-[80px] relative z-10 items-center justify-between gap-2">
      <div className="logo top-6 font-black  text-[16px]">
        <span className=" bg-black text-white px-3 py-2 rounded mr-2">M</span>
        Mentor Systems
      </div>
      {auth && auth?.role ? (
        <div className=" flex items-center gap-6 text-sm ">
          <button onClick={signout}
            className="p-2 px-4  border bg-black text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className=" flex items-center gap-6 text-sm ">
          <Link to="/pricing-stage-1">Pricing</Link>
          <Link to="/signin" className="p-2 px-4 border rounded">
            Sign in
          </Link>
          <Link
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
