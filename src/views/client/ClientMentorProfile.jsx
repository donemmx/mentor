import React from 'react'
import TopCard from '../../component/TopCard'
import ProfileAccount from '../../component/profileAccount/ProfileAccount'
import defaultLogo from "../../assets/bg/welcome-bg.png";
import { useState } from 'react';
import { workspaceStore } from '../../atom/workspaceAtom';
import { useRecoilState } from 'recoil';
import { user } from '../../atom/userAtom';

export default function ClientMentorProfile() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const [userData, setUserData] = useRecoilState(user);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
  
  
  return (
    <div>
        <TopCard
        links={mylinks}
        homeLink={"/dashboard"}
        title={"My account"}
        base={"signin"}
        subtitle={"Manage your account"}
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
                        {userData.firstName} {userData.lastName}
                        </div>

                        <div className="text-xs py-2 ">
                        {workspaceData?.name} <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusantium, sapiente?
                        </div>
                    </div>
                    <button className="h-[40px] w-full bg-gray-700 text-white flex items-center justify-center gap-2 rounded mt-auto text-sm ">
                        <i className="pi pi-plus-circle "></i>
                        Edit Profile
                    </button>
                    </div>
                </div>
            </div>
            
            <div className="right">
                <div className="grid lg:grid-cols-[2fr,10fr] gap-4 ">
                    <div className="">
                        <div className="">
                            <h2 className="font-black text-xl">My Account</h2>
                            <ProfileAccount />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
