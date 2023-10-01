import {  Outlet, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import NotFound  from "../views/NotFound";

export default function MentorLayout() {
  let auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const params = useParams()

  return (
    <div className="">
    {params.id !== undefined ? 
    <>
      {auth && auth?.role === 'mentor' ? (
      <div>
        <Outlet />
      </div>
    ) : (
      <>
        {navigate(`/mentee-signin/${params?.id}`)}
      </>
    )}
    </>:
      <NotFound />
    }
  
  </div>
  );
}
