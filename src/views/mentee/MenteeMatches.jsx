import { useEffect, useState } from "react";
import TopCard from "../../component/TopCard";
import RequestCard from "../../component/requestCard/RequestCard";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { editMatching, getMatchingByMentee, getUserByWorkspace } from "../../utils/api";
import { workspaceStore } from "../../atom/workspaceAtom";
import { Avatar } from "primereact/avatar";

export default function MenteeMatches() {
  const mylinks = ["matches", "requests", "connection", "profile"];
  const auth = useRecoilValue(authState);
  const workspace = useRecoilValue(workspaceStore)
  const [matches, setMatches] = useState([]);

  const sendRequest = (data) => {
    const payload = {
      _action: "approveByMentee",
      _creatorId: auth?.username,
      _matchingId: data.id
    };
    editMatching(payload).then((res) => console.log(res));
  };
  
  useEffect(()=> {
    const payload = {
        sessionID: auth?.sessionID,
        userId: auth?.username,
        status: 'new',
        workspaceId: workspace?.id
    }

    getUserByWorkspace(payload).then((res)=> {
      const newPayload = {
        sessionID: auth?.sessionID,
        id: res.payload[0].id,
        status: 'new',
      }
      getMatchingByMentee(newPayload).then((res)=> {
       setMatches(res.payload)
      })
    })
  }, [])
  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/mentee-dashboard"}
        title={"My Matches"}
        type='mentee'
        base={"/mentee-signin"}
        subtitle={"Manage your account"}
      />

      <div className=" w-[90%] mx-auto my-[10vh]">
        <div className="grid grid-cols-5 gap-3 ">
        {matches.map((res, i)=> (
             <div key={i}>
             <div className=" flex flex-col gap-2 border w-[230px] h-[230px] p-5 rounded">
               <div className="">
                 <Avatar label={`${res.mentor_firstName.toUpperCase().slice(0, 1)}${res.mentor_lastName.toUpperCase().slice(0, 1)}`} size="large" className="!bg-green-200" />
               </div>
               <div className=" font-bold text-lg">{res.mentor_firstName + ' ' +  res.mentor_lastName}</div>
               <p className="text-sm">Wants to connect with you as a mentor</p>
               <div className="flex items-center justify-center gap-3">
                 <button className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out">
                   Send Request{" "}
                 </button>
                 <button className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out">
                   View{" "}
                 </button>
               </div>
             </div>
           </div>
        )) }
        </div>
      </div>
    </div>
  );
}
