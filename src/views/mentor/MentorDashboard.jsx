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

  // const getWorkspace = () => {
  //   const payload = {
  //     sessionID: auth?.sessionID,
  //   };
  //   getProfile(payload).then((res) => {
  //     setUserData(res.payload[0]);
  //   });
  // };  


  
  useEffect(() => {
    // getWorkspace();
    const payload = {
      id: auth.username,
      role: "mentor"
    };
    getMentorProfile(payload).then((res) => {
      // const data ={
      //   ...res.payload[0], workspace, 
      // }
      console.log(payload)
      console.log(res)
      // setWorkspace(data)
    });
  }, []);
  
  console.log(auth)
  console.log(userData)
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

// import RecentRequest from "../../component/RecentRequest";
// import Table from "../../component/Table";
// import MentorSidebar from "./MentorSidebar";

// export default function MentorDashboard() {
//   const users = [
//     {
//       name: "Emmanuel Idusuyi",
//       email: "Emmanuelidus@gmail.com",
//       category: "Mentee",
//     },
//     {
//       name: "John Kate",
//       email: "kate21@gmail.com",
//       category: "Mentee",
//     },
//     {
//       name: "Folmi Akaja",
//       email: "Fuka2@gmail.com",
//       category: "Mentee",
//     },
//   ];
//   return (
//     <div>
//       <MentorSidebar />
//       <div className="w-[90%] mx-auto flex gap-10">
//         <div className=" mt-5 space-y-7 border broder-gray-100 p-6 w-fit rounded">
//           <div className="">Recent Notifications</div>
//           <RecentRequest />
//           <RecentRequest />
//           <RecentRequest />
//         </div>
//         <div className="mt-5 p-6">
//           <div className="mb-5">Recent Connections</div>
//           <Table users={users} />
//         </div>
//       </div>
//     </div>
//   );
// }
