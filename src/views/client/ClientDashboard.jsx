import Notification from "../../component/Notification";
import { useEffect, useState } from "react";
import Table from "../../component/Table";
import ClientSidebar from "./ClientSidebar";
import { manageRequstByWorkspace, requestWorkspace } from "../../utils/api";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function ClientDashboard() {
  const [users, setUsers] = useState([]);
 const auth = useRecoilValue(authState)
 const workspace = useRecoilValue(workspaceStore)
  useEffect(()=> {
    const payload = {
      sessionID: auth?.sessionID,
    }

    manageRequstByWorkspace(payload).then((res)=> {
      console.log(res);
    }).catch((err)=> console.log(err))
  }, [])
  // console.log(auth, 'User\n\n')
  // console.log(auth.username, 'User id\n\n')
  // console.log(workspace.id, 'workspace\n\n')
  // console.log(workspace, 'workspace\n\n')
  return (
    <div>
      <ClientSidebar />
      <div className="w-[90%] mx-auto flex gap-10">
        <div className=" mt-5 space-y-7 border broder-gray-100 p-6 w-fit rounded">
          <div className="">Recent Notifications</div>
          {/* <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification /> */}
        </div>
        <div className="mt-5 p-6">
          <div className="mb-5">Recently Registered</div>
          <Table users={users} />
        </div>
      </div>
    </div>
  );
}
