import { useNavigate } from "react-router-dom";
import RecentRequest from "../../component/RecentRequest";
import Table from "../../component/Table";
import MentorSidebar from "./MentorSidebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useEffect, useState } from "react";
import { authState } from "../../atom/authAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { getMentorProfile, getProfile } from "../../utils/api";

export default function MentorDashboard() {
  const [users, setUsers] = useState([]);

  const auth = useRecoilValue(authState);
  const [userData, setUserData] = useRecoilState(user);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const navigate = useNavigate();
  const sessionIdFromAuth = auth.sessionID

  
  useEffect(() => {
    const payload = {
      // id: auth.username,
      // role: "mentor",
      // email: auth.username,
      sessionId: auth
    }; 
      getProfile(auth).then((res) => { 
        setUserData(res.payload[0])
    });
  }, []);
  console.log(userData, 'The finals')
  const usersx = [
    {
      name: "Emmanuel Idusuyi",
      email: "Emmanuelidus@gmail.com",
      category: "Mentee",
    },

    {
      name: "John Kate",
      email: "kate21@gmail.com",
      category: "Mentee",
    },
    {
      name: "Folmi Akaja",
      email: "Fuka2@gmail.com",
      category: "Mentee",
    },
  ];
  return (
    <div>
      <MentorSidebar 
        firstname={userData?.firstName}
        lastname={userData?.lastName}
        email={auth.username}
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
          <Table users={usersx} />
        </div>
      </div>
    </div>
  );
}
