import {  Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";

export default function MenteeLayout() {
  let auth = useRecoilValue(authState);
  
  return (
    <div className="">
      {auth && auth?.role === 'mentee' ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </div>
  );
}
