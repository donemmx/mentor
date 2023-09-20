import React, { useEffect, useState } from "react";
import { getWorkspace } from "../../utils/api";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import ClientHeader from "./ClientHeader";
import line from "../../assets/bg/lines.svg";

export default function ListWorkspace() {
  const auth = useRecoilValue(authState);
  const [workspace, setWorkspace] = useState([]);
  const listMyWorkspace = () => {
    const payload = {
      sessionID: auth?.sessionID,
    };
    getWorkspace(payload).then((res) => {
      setWorkspace(res.payload);
      console.log(res.payload);
    });
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
                    Hello {auth?.username}
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
                    <div className="bg-gray-50 w-full h-[12vh] my-4 cursor-pointer text-black flex items-center justify-center" key={i}>
                        <div className="p-3 flex items-center justify-center font-black text-xl">
                            {res.name}
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
