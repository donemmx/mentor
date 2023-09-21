import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { user } from '../atom/userAtom';

export default function ClientLayout() {
  let userData = useRecoilValue(user);

  return (
    <div className="">
    {userData && userData?.role[0] === 'owner' ? (
      <div>
        <Outlet />
      </div>
    ) : (
      <>
          <Navigate to="/signin" />
      </>
    )}
  </div>
  )
}
