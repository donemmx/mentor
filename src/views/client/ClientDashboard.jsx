import Notification from "../../component/Notification";
import { useEffect, useState } from "react";
import Table from "../../component/Table";
import ClientSidebar from "./ClientSidebar";
import { getMenteesByWorkspaceId, getMentorsByWorkspaceId, manageRequstByWorkspace, requestWorkspace } from "../../utils/api";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function ClientDashboard() {
  const [users, setUsers] = useState([]);
  const [mentors, setMentors] = useState(0);
  const [mentees, setMentees] = useState(0);
  const auth = useRecoilValue(authState);
  const workspace = useRecoilValue(workspaceStore);

  const listMyMenteesUser = () => {
    const payload = {
      sessionID: auth?.sessionID,
      id: workspace.id,
    };
    getMenteesByWorkspaceId(payload).then((res) => {
      setMentees(res.payload?.length)
  }).catch((err) => console.log(err))

  };

  const listMyMentorsUser = () => {
    const payload = {
      sessionID: auth?.sessionID,
      id: workspace.id,
    };
    getMentorsByWorkspaceId(payload)
      .then((res) => {
        setMentors(res.payload?.length);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const payload = {
      sessionID: auth?.sessionID,
    };

    manageRequstByWorkspace(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    listMyMenteesUser();
    listMyMentorsUser()
  }, []);

  return (
    <div>
      <ClientSidebar menteeCount={mentees} mentorsCount={mentors} />
      <div className="w-[90%] mx-auto flex gap-10">
        <div className=" mt-5 space-y-7 border broder-gray-100 p-6 w-fit rounded">
          <div className="">Recent Notifications</div>
        </div>
        <div className="mt-5 p-6">
          <div className="mb-5">Recently Registered</div>
          <Table users={users} />
        </div>
      </div>
    </div>
  );
}
