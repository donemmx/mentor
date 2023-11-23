import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import {
  editMatching,
  getMatchingByMentee,
  getUserByWorkspace,
} from "../../utils/api";
import TopCard from "../../component/TopCard";
import { Avatar } from "primereact/avatar";

export default function MenteeRequests() {
  const mylinks = ["matches", "requests", "connection", "profile"];
  const auth = useRecoilValue(authState);
  const workspace = useRecoilValue(workspaceStore);
  const [requests, setRequests] = useState([]);

  const reject = (data) => {
    const payload = {
      _action: "cancelledByMentee",
      _creatorId: auth?.username,
      _matchingId: data.id,
    };
    editMatching(payload).then((res) =>  getRequests());
  };
  const accept = (data) => {
    const payload = {
      _action: "activatedByMentee",
      _creatorId: auth?.username,
      _matchingId: data.id,
    };
    editMatching(payload).then((res) => {
      getRequests()
    });
  };

  const getRequests = () => {
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
        status: "requested_by_mentor",
      };
      getMatchingByMentee(newPayload).then((res) => {
        setRequests(res.payload);
      });
    });
  }
  useEffect(() => {
    getRequests()
  }, []);
  return (
    <div>
      <TopCard
        links={mylinks}
        homeLink={"/mentee-dashboard"}
        title={"My Requests"}
        type="mentee"
        base={"/mentee-signin"}
        subtitle={"Manage your requests"}
      />
      <div className=" w-[90%] mx-auto my-[10vh]">
        <div className="grid grid-cols-5 gap-3 ">
          {requests.map((res, i) => (
            <div key={i}>
              <div className=" flex flex-col gap-2 border w-[230px] h-[230px] p-5 rounded">
                <div className="">
                  <Avatar
                    label={`${res?.mentor_firstName
                      .toUpperCase()
                      .slice(0, 1)}${res?.mentor_lastName
                      .toUpperCase()
                      .slice(0, 1)}`}
                    size="large"
                    className="!bg-green-200"
                  />
                </div>
                <div className=" font-bold text-lg">
                  {res?.mentor_firstName + " " + res?.mentor_lastName}
                </div>
                <p className="text-sm">Wants to connect with you as a mentor</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out"
                    onClick={() => accept(res)}
                  >
                    Accept
                  </button>
                  <button
                    className="border p-3 text-xs rounded mt-auto hover:bg-black hover:text-white transition-all ease-in-out"
                    onClick={() => reject(res)}
                  >
                    Reject
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
