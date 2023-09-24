import { Link } from "react-router-dom";
import ClientHeader from "../client/ClientHeader";
import { getProfile, getWorkspace } from "../../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { authState } from "../../atom/authAtom";
import { useEffect } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { classNames } from "primereact/utils";
import defaultLogo from "../../assets/bg/welcome-bg.png";
import TopCard from "../../component/TopCard";
import ThemeCard from "../../component/themeCard/ThemeCard";
import WorkspaceListCard from "../../component/workspaceListCard/WorkspaceListCard";


export default function ClientWorkspace() {
    const mylinks = ["mentors", "mentees", "account", "workspace"];
    const [color, setColor] = useState('red');
    const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
    const auth = useRecoilValue(authState);
    const [userData, setUserData ] = useRecoilState(user);
    const navigate = useNavigate();

    const [active, setActive] = useState("edit");
    const [workspace, setWorkspace] = useState([]);

    const setTab = (data) => {
        setActive(data)
    };


    const listMyWorkspace = () => {
        const payload = {
          sessionID: auth?.sessionID,
        }; 
        getProfile(payload).then((res)=> {
          setUserData(res.payload[0])
        })
        getWorkspace(payload).then((res) => {
          setWorkspace(res.payload);
          if (res.payload.length === 1) {
            setWorkspaceData(res.payload[0]);
          //   navigate("/dashboard");    
          }
        });
      };

      const selectWorkspace = (data) => {
        setWorkspaceData(data);
        navigate("/dashboard");
      };
      
      const changeColor = (e) => {
        const theColor = '#'+ e.value
        setColor(theColor);
      }
    
      useEffect(() => {
        listMyWorkspace();

      }, []); 
    return(
        <div> 

                <div className="">
 
                {/* HEADER */}
                
                <TopCard
                    links={mylinks}
                    homeLink={'/dashboard'}
                    base={'signin'}
                    title={"My Workspace"}
                    subtitle={"Manage your workspace"}
                />
                <div className="w-[95%] lg:w-[90%] mx-auto grid lg:grid-cols-[3fr,9fr] gap-4 my-10 ">
                    <div className="left">
                        <div className="card p-10 border-[1px] border-gray-50 bg-gray-100 text-black h-[300px] w-[300px] rounded-lg ">
                            <div className="h-full flex flex-col justify-between ">
                                <div className="">
                                    <div className="title text-xl font-bold flex items-center gap-2 ">
                                        <i className="pi pi-cog pi-spin "></i>
                                        My Workspace 1
                                    </div>
                                    <div className="text-xs py-2 ">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sapiente?
                                    </div>

                                </div>
                                <button className="h-[40px] w-full bg-gray-700 text-white flex items-center justify-center gap-2 rounded mt-auto text-sm ">
                                    <i className="pi pi-plus-circle "></i>
                                    Upgrade</button>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="grid lg:grid-cols-[2fr,10fr] gap-4 ">
                            <div className="flex flex-col gap-4 text-sm ">
                                <div className={active==="edit" ? "font-bold cursor-pointer":"cursor-pointer"} onClick={()=>setTab("edit")}>Edit Workspace</div>
                                <div className={active==="add" ? "font-bold cursor-pointer":"cursor-pointer"} onClick={()=>setTab("add")}>Add Workspace</div>
                                <div className={active==="switch" ? "font-bold cursor-pointer":"cursor-pointer"} onClick={()=>setTab("switch")}>Switch Workspace</div>
                                <div className={active==="theme" ? "font-bold cursor-pointer":"cursor-pointer"} onClick={()=>setTab("theme")}>Themes</div>
                            </div>
                            <div className="">
                               {active === "theme" ? 
                               <div className="">
                                    <h2 className="font-black text-xl ">Select A Theme</h2>
                                    <div className="my-10 grid grid-cols-3 gap-6">
                                    {
                                        [1,2,3,4,5].map((res)=> (
                                            <ThemeCard />
                                        ))
                                    }
                                    </div>
                                </div>
                                :
                                
                                ''
                                }
                                <div className="grid grid-cols-2 ">
                                    {active === "switch" ? 
                                    <div className="">
                                        <h2 className="font-black text-xl">Select Your Workspace</h2>
                                        <div className="w-full">
                                        
                                            <div className="grid grid-cols-2 ">
                                            {workspace?.map((res, i) => (
                                                <WorkspaceListCard data={res}  />
                                            ))}
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}