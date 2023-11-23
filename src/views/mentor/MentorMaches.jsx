import { useEffect, useState } from "react";
import TopCard from "../../component/TopCard";
import RequestCard from "../../component/requestCard/RequestCard";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import {
  editMatching,
  getMatchingByMentee,
  getMatchingByMentor,
  getUserByWorkspace,
} from "../../utils/api";
import { workspaceStore } from "../../atom/workspaceAtom";
import { Avatar } from "primereact/avatar";

export default function MentorMaches() {
  const mylinks = ["matches", "requests", "connection", "profile"];
  const auth = useRecoilValue(authState);
  const workspace = useRecoilValue(workspaceStore);
  const [matches, setMatches] = useState([]);
  const [requested, setRequested] = useState([]);

  const sendRequest = (data) => {
    const payload = {
      _action: "approveByMentor",
      _creatorId: auth?.username,
      _matchingId: data.id,
    };
    editMatching(payload).then((res) => getMatches());
  };
  const cancelRequest = (data) => {
    const payload = {
      _action: "cancelledByMentor",
      _creatorId: auth?.username,
      _matchingId: data.id,
    };
    editMatching(payload).then((res) => getMatches());
  };

  const getMatches = () => {
    const payload = {
      sessionID: auth?.sessionID,
      userId: auth?.username,
      status: "new",
      workspaceId: workspace?.id,
    };

    getUserByWorkspace(payload).then((res) => {
      const newPayload = {
        sessionID: auth?.sessionID,
        id: res.payload[0].id,
        status: "new",
      };
      getMatchingByMentor(newPayload).then((res) => {
        setMatches(res.payload);
      });
    });
    getUserByWorkspace(payload).then((res) => {
      const newPayload = {
        sessionID: auth?.sessionID,
        id: res.payload[0].id,
        status: "requested_by_mentor",
      };
      getMatchingByMentor(newPayload).then((res) => {
        setRequested(res.payload);
      });
    });
  };

  useEffect(() => {
    getMatches();
  }, []);
  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/mentor-dashboard"}
        title={"My Matches"}
        type="mentor"
        base={"/mentor-signin"}
        subtitle={"Manage your account"}
      />
      <div className=" w-[90%] mx-auto my-[10vh]">
        <div className="grid grid-cols-5 gap-3 ">
          {matches.map((res, i) => (
            <div key={i}>
              <div className=" flex flex-col gap-2 border w-[230px] h-[230px] p-5 rounded">
                <div className="">
                  <Avatar
                    label={`${res.mentee_firstName
                      .toUpperCase()
                      .slice(0, 1)}${res.mentee_lastName
                      .toUpperCase()
                      .slice(0, 1)}`}
                    size="large"
                    className="!bg-green-200"
                  />
                </div>
                <div className=" font-bold text-lg">
                  {res.mentee_firstName + " " + res.mentee_lastName}
                </div>
                <p className="text-sm">Wants to connect with you as a mentor</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out"
                    onClick={() => sendRequest(res)}
                  >
                    Send Request{" "}
                  </button>
                  <button className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out">
                    View{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {requested.map((res, i) => (
            <div key={i}>
              <div className=" flex flex-col gap-2 border w-[230px] h-[230px] p-5 rounded">
                <div className="">
                  <Avatar
                    label={`${res.mentee_firstName
                      .toUpperCase()
                      .slice(0, 1)}${res.mentee_lastName
                      .toUpperCase()
                      .slice(0, 1)}`}
                    size="large"
                    className="!bg-green-200"
                  />
                </div>
                <div className=" font-bold text-lg">
                  {res.mentee_firstName + " " + res.mentee_lastName}
                </div>
                <p className="text-sm">Wants to connect with you as a mentor</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out"
                    onClick={() => cancelRequest(res)}
                  >
                    Cancel Request{" "}
                  </button>
                  <button className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out">
                    View{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
