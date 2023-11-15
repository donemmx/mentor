import { useEffect, useState } from 'react';
import RecentRequest from '../../component/RecentRequest'
import Table from '../../component/Table'
import MenteeSidebar from './MenteeSidebar'
import { authState } from '../../atom/authAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { user } from '../../atom/userAtom';
import { getMenteeProfile, getProfile, getUserWorkspace } from '../../utils/api';
import { workspaceStore } from '../../atom/workspaceAtom';
import { useNavigate } from 'react-router-dom';

export default function MenteeDashboard() {

  const auth = useRecoilValue(authState);
  const [userData, setUserData] = useRecoilState(user);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);

  
  useEffect(()=> {
    const payload = {
      sessionID: auth,
    } 
    getProfile(auth).then((res) => { 
      setUserData(res.payload[0])
    }).catch((err)=> console.log(err))
  }, [])
   
  return (
    <div>
      <MenteeSidebar 
      firstname={userData?.firstName}
      lastname={userData?.lastName}
      />
      <div className="w-[90%] mx-auto flex gap-10">
        <div className=" mt-5 space-y-7 border broder-gray-100 p-6 w-fit rounded">
          <div className="">Recent Notifications</div>
          <RecentRequest />
          <RecentRequest />
          <RecentRequest />
        </div>
        <div className="mt-5 p-6">
          <div className="mb-5">Recent Connections</div>
          {/* <Table users={users} /> */}
        </div>
      </div>
    </div>
  )
}
