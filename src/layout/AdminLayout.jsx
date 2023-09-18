import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";

export default function AdminLayout() {
  let userData = useRecoilValue(user);

  return (
    <div>
      {userData?.role === "Admin" ? (
        <>
          <div className="flex w-[90%] mx-auto pt-[12vh] lg:pt-0 lg:absolute lg:top-2 lg:w-[calc(100vw-19vw)] lg:left-[18vw]">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
