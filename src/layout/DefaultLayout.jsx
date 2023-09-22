import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
export default function DefaultLayout() {
  let auth = useRecoilValue(authState);

  return (
    <div className="">
      {!auth ? (
        <div>
          <Outlet />
        </div>
      ) : auth && auth?.role === "mentee" ? (
        <>
          <Navigate to="/mentee-dashboard" />
        </>
      ) : auth && auth?.role === "mentor" ? (
        <>
          <Navigate to="/mentor-dashboard" />
        </>
      ) : auth && auth?.role === "owner" ? (
        <>
          <Navigate to="/list-workspace" />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
