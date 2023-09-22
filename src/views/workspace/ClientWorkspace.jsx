import { Link } from "react-router-dom";
import ClientHeader from "../client/ClientHeader";
import { getProfile, getWorkspace } from "../../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { authState } from "../../atom/authAtom";
import { useEffect } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { useState } from "react";
import { classNames } from "primereact/utils";


export default function ClientWorkspace() {
  const [color, setColor] = useState('red');
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
    const auth = useRecoilValue(authState);
    const [userData, setUserData ] = useRecoilState(user);

    const listMyWorkspace = () => {
        const payload = {
          sessionID: auth?.sessionID,
        }; 
        getProfile(payload).then((res)=> {
          setUserData(res.payload[0])
        })
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

                <div className="bg-[#e6e6e6]">
 
                {/* HEADER */}
                <div className="w-[100%] shadow text-white ">
                    <div className="h-full w-[90%] mx-auto">
                        
                        <div className="flex h-[80px] relative z-10 items-center justify-between gap-2">
                            <div className="logo top-6 font-black  text-[16px]">
                                <span className=" bg-[black] text-white px-3 py-2 rounded mr-2">M</span>
                                Mentor Systems
                            </div>
                            <div className=" flex items-center gap-6 text-sm ">
                                <Link to='/list-workspace'>
                                    Workspace
                                </Link>
                                <button
                                    className="p-2 px-4  border bg-black text-white rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* BODY */}
                <div className="mx-auto lg:flex md:flex flex-wrap w-[90%]">

                    {/* LEFT SECTION */}
                    <div className=" max-h-[100vh] border mt-[10px] p-5 rounded-lg bg-[#ffffff] shadow-lg lg:min-w-[200px] w-[100%] ">
                        {/* WORKSPACE DETAIL */}
                        <div className="rounded-lg bg-gradient-to-br from-[#33ccff] to-[var(--primary)] p-5  text-white">
                            <h3 className="text-upper">workspace name</h3>
                            <small className="my-3 text-[#e6e6e6] text-bold">Created by</small>
                            <div className="my-4 ">
                                <span className=" bg-black text-white px-2 py-1 rounded-lg mr-2">m</span>
                                <small>{userData.firstName} {userData.lastName} </small>
                            </div>
                        </div>
                        <div>
                            <div className="flex mt-5 items-center justify-between my-5">
                                <b className="sm:text-[13px] md:[text-15px] md:font-bold">Added Tags</b>
                                <p className="text-xs">&#43; Add more tags</p>
                            </div>

                        </div>
                            <hr />
                        <div>
                            <div className="flex mt-5 items-center justify-between my-5">
                                <b className="font-bold">Other Workspaces</b>
                                <p className="text-xs">&#43; Add</p>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT SECTION */}
                    <div className=" mt-[10px] lg:w-[80%] md:w-[100%] w-[100%] pl-5 py-5">
                        <div className="w-[100%] mx-auto rounded h-[90%]">
                            <div className="mb-4 flex flex-wrap justify-between">
                                {/* THE INPUT */}
                                <div>
                                    <h1 className="text-[30px] text-bold">Projects</h1>
                                    <div className="my-5 flex items-center border">
                                        <input type="search" placeholder="Search Projects" className="rounded-lg md:max-w-[700px] md:min-w-[400px] py-[10px] px-2 text-[10px]" name="Search" id="" />
                                        <input type="submit" className="ml-4 shadow border-[#ffffff] py-[7px] px-[15px] text-[13px] rounded hover:bg-[var(--primary)]hover:text-[#e6e6e6]" value="Filter &#8594;" id="" />
                                    </div>
                                </div>
                                {/* SECTION TO CHANGE THEME */}
                                <div className="border rounded-lg shadow md:min-w-[300px] p-5 bg-[#fff] ">
                                    <span
                                    data-aos="fade-down"
                                    data-aos-duration="1000"
                                    className=" flex items-center gap-2 mb-5"
                                    >
                                        <ColorPicker value={color} onChange={changeColor} />
                                        <label htmlFor="username"> Select a Color </label>
                                    </span>
                                    <p className="p-2 m-1 text-[#000] text-sm bg-[#e6e6e6] rounded text-center">Change Theme</p>
                                </div>
                            </div>
                            {/* MARKET SECTION */}
                            <div className="">
                                <div className=" mb-[20px]">
                                    <p className="text-xs text-bold">Market Input</p>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="rounded-lg shadow p-5 mr-[20px] mb-[20px] max-w-[300px] bg-[#ffffff] cursor-pointer">
                                        <div className="rounded-lg flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-[30px] w-[30px] bg-[#0086b3] rounded-[50%] mr-2 flex justify-center items-center">
                                                    {/* THE WORLD */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-[1200] text-sm">Product requirement</h3>
                                                    <p className="text-[1200] text-xs">30th September, 2023</p>
                                                </div>
                                            </div>
                                            <div>
                                            {/* Bell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                </svg>
                                            </div>  
                                        </div>
                                        <div className="text-[10px] my-3"> 
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ad  voluptatem! </p>
                                            <div className="flex mt-3">
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* SYSTEM LEVEL */}
                            <div>
                                <div className="border mb-[20px]">
                                    <p className="text-xs text-bold">System Level</p>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="rounded-lg shadow p-5 mr-[20px] mb-[20px] max-w-[300px] bg-[#ffffff] cursor-pointer">
                                        <div className="rounded-lg flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-[30px] w-[30px] bg-[#0086b3] rounded-[50%] mr-2 flex justify-center items-center">
                                                    {/* THE WORLD */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-[1200] text-sm">Product requirement</h3>
                                                    <p className="text-[1200] text-xs">30th September, 2023</p>
                                                </div>
                                            </div>
                                            <div>
                                            {/* Bell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                </svg>
                                            </div>  
                                        </div>
                                        <div className="text-[10px] my-3"> 
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ad  voluptatem! </p>
                                            <div className="flex mt-3">
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg shadow p-5 mr-[20px] mb-[20px] max-w-[300px] bg-[#ffffff] cursor-pointer">
                                        <div className="rounded-lg flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-[30px] w-[30px] bg-[#0086b3] rounded-[50%] mr-2 flex justify-center items-center">
                                                    {/* THE WORLD */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-[1200] text-sm">Product requirement</h3>
                                                    <p className="text-[1200] text-xs">30th September, 2023</p>
                                                </div>
                                            </div>
                                            <div>
                                            {/* Bell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                </svg>
                                            </div>  
                                        </div>
                                        <div className="text-[10px] my-3"> 
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ad  voluptatem! </p>
                                            <div className="flex mt-3">
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg shadow p-5 mr-[20px] mb-[20px] max-w-[300px] bg-[#ffffff] cursor-pointer">
                                        <div className="rounded-lg flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-[30px] w-[30px] bg-[#0086b3] rounded-[50%] mr-2 flex justify-center items-center">
                                                    {/* THE WORLD */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-[1200] text-sm">Product requirement</h3>
                                                    <p className="text-[1200] text-xs">30th September, 2023</p>
                                                </div>
                                            </div>
                                            <div>
                                            {/* Bell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                </svg>
                                            </div>  
                                        </div>
                                        <div className="text-[10px] my-3"> 
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ad  voluptatem! </p>
                                            <div className="flex mt-3">
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg shadow p-5 mr-[20px] mb-[20px] max-w-[300px] bg-[#ffffff] cursor-pointer">
                                        <div className="rounded-lg flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-[30px] w-[30px] bg-[#0086b3] rounded-[50%] mr-2 flex justify-center items-center">
                                                    {/* THE WORLD */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-[1200] text-sm">Product requirement</h3>
                                                    <p className="text-[1200] text-xs">30th September, 2023</p>
                                                </div>
                                            </div>
                                            <div>
                                            {/* Bell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                </svg>
                                            </div>  
                                        </div>
                                        <div className="text-[10px] my-3"> 
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ad  voluptatem! </p>
                                            <div className="flex mt-3">
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* COMPONENTS */}
                            <div>
                                <div className="border mb-[20px]">
                                    <p className="text-xs text-bold">Components</p>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="rounded-lg shadow p-5 mr-[20px] mb-[20px] max-w-[300px] bg-[#ffffff] cursor-pointer">
                                        <div className="rounded-lg flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-[30px] w-[30px] bg-[#0086b3] rounded-[50%] mr-2 flex justify-center items-center">
                                                    {/* THE WORLD */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-[1200] text-sm">Product requirement</h3>
                                                    <p className="text-[1200] text-xs">30th September, 2023</p>
                                                </div>
                                            </div>
                                            <div>
                                            {/* Bell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                </svg>
                                            </div>  
                                        </div>
                                        <div className="text-[10px] my-3"> 
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ad  voluptatem! </p>
                                            <div className="flex mt-3">
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg shadow p-5 mr-[20px] mb-[20px] max-w-[300px] bg-[#ffffff] cursor-pointer">
                                        <div className="rounded-lg flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-[30px] w-[30px] bg-[#0086b3] rounded-[50%] mr-2 flex justify-center items-center">
                                                    {/* THE WORLD */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-globe-europe-africa" viewBox="0 0 16 16">
                                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-[1200] text-sm">Product requirement</h3>
                                                    <p className="text-[1200] text-xs">30th September, 2023</p>
                                                </div>
                                            </div>
                                            <div>
                                            {/* Bell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                </svg>
                                            </div>  
                                        </div>
                                        <div className="text-[10px] my-3"> 
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ad  voluptatem! </p>
                                            <div className="flex mt-3">
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                                <div className="h-[20px] w-[20px] rounded-[50%] bg-[#0086b3] border-t-2 border-r-2 border-b-2 border-l-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}