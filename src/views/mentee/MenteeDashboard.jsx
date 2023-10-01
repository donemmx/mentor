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
  const [users, setUsers] = useState([]);

  const auth = useRecoilValue(authState);
  const [userData, setUserData] = useRecoilState(user);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const navigate = useNavigate();

  const getWorkspace = () => {
    const payload = {
      sessionID: auth?.sessionID,
    };
    getProfile(payload).then((res) => {
      setUserData(res.payload[0]);
    });
  };

  // useEffect(() => {
  //   getWorkspace();
  //   const payload = {
  //     id: workspace
  //   };
  //   getUserWorkspace(payload).then((res) => {
  //     const data ={
  //       ...res.payload[0], workspace, 
  //     }
  //     setWorkspace(data)
  //   });
  // }, []);
  
  
  
  // const [users, setUsers] = useState([]);
  // const auth = useRecoilValue(authState)
  // const workspace = useRecoilValue(workspaceStore)
  useEffect(()=> {
    const payload = {
      sessionID: auth?.sessionID,
    }
    getMenteeProfile(payload).then((res)=> {
      console.log(res);
      const data = {
        ...res.payload[0],
        ...res.status
    }
      if (res.status === "OK"){
        console.log('Response OK')
      }
    setUserData(data)
    }).catch((err)=> console.log(err))
  }, [])
  console.log(userData, 'As user data')
  
  return (
    <div>
      <MenteeSidebar 
      firstname={userData.firstName}
      lastname={userData.lastName}
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
          <Table users={users} />
        </div>
      </div>
    </div>
  )
}
