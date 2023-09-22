import { useEffect, useState } from 'react';
import RecentRequest from '../../component/RecentRequest'
import Table from '../../component/Table'
import MenteeSidebar from './MenteeSidebar'
import { authState } from '../../atom/authAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { user } from '../../atom/userAtom';
import { getProfile, getUserWorkspace } from '../../utils/api';
import { workspaceStore } from '../../atom/workspaceAtom';

export default function MenteeDashboard() {
  const [users, setUsers] = useState([]);

  const auth = useRecoilValue(authState);
  const [userData, setUserData] = useRecoilState(user);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);

  const getWorkspace = () => {
    const payload = {
      sessionID: auth?.sessionID,
    };
    getProfile(payload).then((res) => {
      setUserData(res.payload[0]);
    });
  };

  useEffect(() => {
    getWorkspace();
    const payload = {
      id: workspace
    };
    getUserWorkspace(payload).then((res) => {
      const data ={
        ...res.payload[0], workspace, 
      }
      setWorkspace(data)
    });
  }, []);
  return (
    <div>
      <MenteeSidebar />
      <div className="w-[90%] mx-auto flex gap-10">
        <div className=" mt-5 space-y-7 border broder-gray-100 p-6 w-fit rounded">
          <div className="">Recent Notifications</div>
          <RecentRequest />
          <RecentRequest />
          <RecentRequest />
        </div>
        <div className="mt-5 p-6">
          <div className="mb-5">Recent Connections</div>
          <Table users={users} />
        </div>
      </div>
    </div>
  )
}
