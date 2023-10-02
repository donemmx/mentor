import React from 'react'
import defaultLogo from "../../assets/bg/welcome-bg.png";
import { useRecoilState } from 'recoil';
import { workspaceStore } from '../../atom/workspaceAtom';
import { useNavigate } from 'react-router-dom';

export default function WorkspaceListCard({data}) {
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
  const navigate = useNavigate()
  const selectWorkspace = (item) => {
    setWorkspaceData(item);
    navigate("/dashboard");
  };
  return (
    <div
    className="bg-white  border-[1px] border-gray-100 w-full h-[14vh] rounded-lg  cursor-pointer transition-all ease-in-out text-black flex items-center gap-4  hover:bg-black hover:border-[2px] hover:text-white "
    onClick={() => selectWorkspace(data)}
  >
    <div className="h-[80px] w-[50%] mx-2 rounded-lg">
      <img
        src={data?.logo ? data?.logo : defaultLogo}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div className="p-3 flex flex-col justify-center ">
      <p className="font-black text-lg"> {data?.name}</p>
      <p className=" text-[10px] ">
        Want to know where this information comes from
      </p>
    </div>
  </div>
  )
}
