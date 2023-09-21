import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";

export default function MentorLayout() {
  let userData = useRecoilValue(user);
  
  return (
    <div className="">
    {userData && userData?.role[0] === 'mentor' ? (
      <div>
        <Outlet />
      </div>
    ) : (
      <>
        <Navigate to="/mentor-signin" />
      </>
    )}
  </div>
  );
}
