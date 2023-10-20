import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import NotFound from "../views/NotFound";

export default function MenteeLayout() {
  let auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="">
      {params.id === undefined ? (
        <>
          {auth && auth?.role === "mentee" ? (
            <div>
              <h1>Hello world</h1>
              <Outlet />
            </div>
          ) : (
            <>
              <h1>Hello world</h1>
              {navigate(`/mentee-signin/${params.id}`)}
            </>
          )}
        </>
      ) : (
        <>
          <h1>Hello world</h1>
          <NotFound />
          <div>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}
