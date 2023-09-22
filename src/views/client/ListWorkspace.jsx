import React, { useEffect, useState } from "react";
import { getProfile, getWorkspace } from "../../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import ClientHeader from "./ClientHeader";
import line from "../../assets/bg/lines.svg";
import defaultLogo from "../../assets/bg/welcome-bg.png";
import { user } from "../../atom/userAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useNavigate } from "react-router-dom";
export default function ListWorkspace() {
  const auth = useRecoilValue(authState);
  const [workspace, setWorkspace] = useState([]);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
  const [userData, setUserData] = useRecoilState(user);
  const navigate = useNavigate();
  const listMyWorkspace = () => {
    const payload = {
      sessionID: auth?.sessionID,
    };
    getWorkspace(payload).then((res) => {
      setWorkspace(res.payload);
      if (res.payload.length === 1) {
        navigate("/dashboard");
      }
    });
    getProfile(payload).then((res) => {
      setUserData(res.payload[0]);
    });
  };

  const selectWorkspace = (data) => {
    setWorkspaceData(data);
    navigate("/dashboard");
  };

  useEffect(() => {
    listMyWorkspace();
  }, []);
  return (
    <div>
      <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
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

                <div className=" w-full">
                  {workspace?.map((res, i) => (
                    <div
                      className="bg-white w-full h-[14vh] my-4 rounded-lg  cursor-pointer transition-all ease-in-out text-black flex items-center gap-4  hover:bg-black hover:border-[2px] hover:text-white "
                      key={i}
                      onClick={() => selectWorkspace(res)}
                    >
                      <div className="h-[80px] w-[50%] mx-2 rounded-lg">
                        <img
                          src={res?.logo ? res?.logo : defaultLogo}
                          alt=""
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="p-3 flex flex-col justify-center ">
                        <p className="font-black text-lg"> {res.name}</p>
                        <p className=" text-xs">
                          Want to know where this information comes from
                        </p>
                      </div>
                    </div>
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
