import React, { useEffect, useState } from "react";
import { getProfile, getWorkspace } from "../../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import ClientHeader from "./ClientHeader";
import line from "../../assets/bg/lines.svg";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import WorkspaceListCard from '../../component/workspaceCard/WorkspaceListCard'
import { workspaceStore } from "../../atom/workspaceAtom";

export default function ListWorkspace() {
  const auth = useRecoilValue(authState);
  const [workspace, setWorkspace] = useState([]);
  const [userData, setUserData] = useRecoilState(user);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);

  const navigate = useNavigate();
  const listMyWorkspace = () => {
    const payload = {
      sessionID: auth?.sessionID,
    };
    getWorkspace(payload).then((res) => {
      setWorkspace(res.payload);
      if (res.payload.length === 1) {
        setWorkspaceData(res.payload[0]);
        navigate("/dashboard");
      }
    });
    getProfile(payload).then((res) => {
      setUserData(res.payload[0]);
    });
  };



  useEffect(() => {
    listMyWorkspace();
  }, []);
  return (
    <div>
      <div className="w-full min-h-[100vh] bg-[var(--primary)] text-white ">
        <div className="grid h-full w-[90%] mx-auto ">
          <ClientHeader />
          <div className=" flex">
            <div className="">
              <div className=" mx-auto">
                <div className="steps">
                  <div className="font-light">My workspace</div>
                  <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                    Hello {`${userData?.firstName}  ${userData?.lastName}`}
                  </div>
                </div>
                <h3
                  data-aos="fade-down"
                  data-aos-duration="1500"
                  className="w-[100%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
                >
                  Select a Workspace
                </h3>

                <div className=" relative my-[10vh] grid md:grid-cols-2 z-1000 lg:grid-cols-3 gap-4 w-full">
                  {workspace?.map((res, i) => (
                    <WorkspaceListCard data={res}/>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 z-0  h-[70vh]">
                <img
                  className=" h-full w-full object-cover"
                  src={line}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
