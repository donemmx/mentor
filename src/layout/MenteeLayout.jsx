import {  Outlet } from "react-router-dom";
import { user } from "../atom/userAtom";
import { useRecoilValue } from "recoil";

export default function MenteeLayout() {
  let userData = useRecoilValue(user);
  
  return (
    <div className="">
      {!userData?.role ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <>
         
        </>
      )}
    </div>
  );
}
