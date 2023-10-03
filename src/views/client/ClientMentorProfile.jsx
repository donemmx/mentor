import React from 'react'
import TopCard from '../../component/TopCard'
import ProfileAccount from '../../component/profileAccount/ProfileAccount'
import defaultLogo from "../../assets/bg/welcome-bg.png";
import { useState } from 'react';
import { workspaceStore } from '../../atom/workspaceAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { user } from '../../atom/userAtom';
import { profileAccount } from '../../atom/profileAtom';

export default function ClientMentorProfile() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const [userData, setUserData] = useRecoilState(profileAccount);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
console.log(workspaceData)
  
  
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
                      {workspaceData.name}
                        </div>

                        <div className="text-xs py-2 ">
                            <span className='text-lg mb-[5px]'>Description</span>
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusantium, sapiente?
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
                <div className="grid lg:grid-cols-[2fr,10fr] gap-4 ">
                    <div className="">
                        <div className="">
                            <h2 className="font-black text-xl">My Account</h2>
                            
                            <div>
                            <div className="h-[70vh] mt-5  ">
                                <div className='flex flex-wrap items-center my-1'>
                                    <span className='text-[30px] font-bold mr-5 p-0'>{userData.firstName} {userData.lastName}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                    </svg>        
                                    <span className=' ml-2'>{userData.province}</span>
                                </div>
                                <div className=''>Role - {userData.role}</div>
                                <br />
                                <div>
                                    {/* <small className='text-uppercase mb-3 text-bold'>Contact Data</small> */}
                                    <table>
                                    <tr>
                                        <td className='font-bold p-5 border'>Phone</td>
                                        <td className='px-5'>{userData.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className='font-bold p-5 border'>Address</td>
                                        <td className='px-5'>{userData.userId} {userData.postalcode}</td>
                                    </tr>
                                    <tr>
                                        <td className='font-bold p-5 border'>Email</td>
                                        <td className='px-5'>{userData.email}</td>
                                    </tr>
                                    <tr>
                                        <td className='font-bold p-5 border'>Gender</td>
                                        <td className='px-5'>Female</td>
                                    </tr>
                                    </table>

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
