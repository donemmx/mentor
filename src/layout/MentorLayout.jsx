import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import { workspaceStore } from "../atom/workspaceAtom";

export default function MentorLayout() {
  let auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const workspaceData = useRecoilValue(workspaceStore)
  return (
    <div className="">
    {auth && auth?.role === 'mentor' ? (
      <div>
        <Outlet />
      </div>
    ) : (
      <>
          {navigate(`/mentor-signin/${workspaceData?.workspace}`)}
        </>
    )}
  </div>
  );
}
