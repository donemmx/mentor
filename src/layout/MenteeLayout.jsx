import {  Navigate, Outlet } from "react-router-dom";
import { user } from "../atom/userAtom";
import { useRecoilValue } from "recoil";

export default function MenteeLayout() {
  let userData = useRecoilValue(user);
  
  return (
    <div className="">
      {userData && userData?.role[0] === 'mentee' ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <>
          <Navigate to="/mentee-signin" />
        </>
      )}
    </div>
  );
}
