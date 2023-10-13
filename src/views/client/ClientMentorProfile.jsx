import React from 'react'
import TopCard from '../../component/TopCard'
import defaultLogo from "../../assets/bg/welcome-bg.png";
import { workspaceStore } from '../../atom/workspaceAtom';
import { useRecoilState } from 'recoil';
import { profileAccount } from '../../atom/profileAtom';

export default function ClientMentorProfile() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const [userData, setUserData] = useRecoilState(profileAccount);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
//   console.log('created view to another page, ban as pop up')
  
const back = () => {
    window.history.back()
}
  
  return (
    <div>
        <TopCard
        links={mylinks}
        homeLink={"/dashboard"}
        title={"User Profile"}
        base={"signin"}
        subtitle={"Manage User Profile"}
        />
        
        
        <div className="w-[95%] lg:w-[90%] mx-auto grid lg:grid-cols-[3fr,9fr] gap-4 my-10 ">
            <div className="left">
                <div className="card p-10 border-[1px] relative border-gray-50 bg-gray-100 text-black h-[300px] w-[300px] rounded-lg ">
                    <div className="h-full flex flex-col justify-between  ">
                    <div className="">
                        <div className=" absolute top-4 right-2 h-[50px] w-[50px] flex items-start">
                        <img
                            src={
                            workspaceData?.logo ? workspaceData?.logo : defaultLogo
                            }
                            alt=""
                            className="w-full h-full object-contain"
                        />
                        </div>
                        <div className="title text-xl font-bold flex items-center gap-2 ">
                        <i className="pi pi-cog pi-spin "></i>
                      {workspaceData.name}
                        </div>

                      
                    </div>
                    {/* <button className="h-[40px] w-full bg-gray-700 text-white flex items-center justify-center gap-2 rounded mt-auto text-sm ">
                        <i className="pi pi-plus-circle "></i>
                        Edit Profile
                    </button> */}
                    </div>
                </div>
            </div>
            
            <div className="right">
                <div  className=" cursor-pointer text-lg font-bold mb-3" onClick={back}>
                   <i className='pi pi-angle-left !text-lg'></i> Back
                </div>
                <div className="grid lg:grid-cols-[5fr,5fr] gap-4 ">
                    <div className="">
                        <div className="">
                            <h2 className="font-black text-xl">{userData?.firstName} {userData?.lastName}</h2>
                            
                            <div>
                            <div className="h-full mt-5  ">
                                <div className='flex items-center my-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                    </svg>        
                                    <span className=' ml-2'>{userData.provinceId}</span>
                                </div>
                                <div className=''>Role - {userData.role}</div>
                                <br />
                                <div className='flex flex-col gap-4'>
                                    {/* <small className='text-uppercase mb-3 text-bold'>Contact Data</small> */}
                                    <div className='flex'>
                                        <div className='font-bold '>Phone</div>
                                        <div className='px-5'>{userData.phone}</div>
                                    </div>
                                    <div className='flex'>
                                        <div className='font-bold '>Address</div>
                                        <div className='px-5'>{userData.userId} {userData.postalcode}</div>
                                    </div>
                                    <div className='flex'>
                                        <div className='font-bold '>Email</div>
                                        <div className='px-5'>{userData.email}</div>
                                    </div>
                                    <div className='flex'>
                                        <div className='font-bold '>Gender</div>
                                        <div className='px-5'>Female</div>
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
