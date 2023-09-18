import {  Outlet } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { user } from "../atom/userAtom";

export default function DefaultLayout() {
  // let auth = useRecoilValue(user);

  return (
    <>
      <Outlet />
    </>
  );
}
