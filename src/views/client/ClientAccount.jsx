import TopCard from "../../component/TopCard";
import { Avatar } from "primereact/avatar";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { workspaceStore } from "../../atom/workspaceAtom";
import defaultLogo from "../../assets/bg/welcome-bg.png";


export default function ClientAccount() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const [userData, setUserData ] = useRecoilState(user);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);

  const isLoggedin = useRecoilValue(user);
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const editProfile = () => {
    setOpen(!open);
    setPhone(isLoggedin?.data?.phoneNumber);
    setFullName(isLoggedin?.data?.fullName);
  };
  console.log(fullName)
  console.log(phone)
  console.log(password)
  // console.log(password)

//   {
//     "role": [
//         "owner"
//     ],
//     "lastName": "Ladi",
//     "firstName": "Samuel",
//     "id": "ladisamuel00@gmail.com",
//     "postalcode": "200261",
//     "province": "Alberta",
//     "phone": "+2347051900086"
// }

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
                            <img src={workspaceData?.logo ? workspaceData?.logo : defaultLogo} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="title text-xl font-bold flex items-center gap-2 ">
                            <i className="pi pi-cog pi-spin "></i>
                           {userData.firstName} {userData.lastName}
                        </div>
                      
                        <div className="text-xs py-2 ">
                        {workspaceData?.name} <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sapiente?
                        </div>

                    </div>
                    <button className="h-[40px] w-full bg-gray-700 text-white flex items-center justify-center gap-2 rounded mt-auto text-sm ">
                        <i className="pi pi-plus-circle "></i>
                        Edit Profile</button>
                </div>
            </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-5 p-6">
        <div className="profile__body pt-[2vh]  h-[100%]  flex flex-col m-auto ">
          <div className="name flex items-center gap-2">
            <Avatar
              label='EI'
              size="xlarge"
              shape="circle"
            />
            <p>{isLoggedin?.data?.email}</p>
          </div>
          {open ? (
            <div className="formBody w-full md:w-[70%] grid grid-cols-1 md:grid-cols-2 mt-5 mb-5 gap-5">
              <span className="p-float-label">
                <InputText
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="email">Full Name</label>
              </span>
              <span className="p-float-label">
                <InputText
                  id="phone"
                  // value={phone}
                  value="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="phone">Phone Number</label>
              </span>
              <span className="p-float-label">
                <Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                />
                <label htmlFor="email">Password</label>
              </span>
              <span className="p-float-label">
                <Password
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  toggleMask
                />
                <label htmlFor="email">Confirm Password</label>
              </span>
              <button className="primary__btn w-fit ml-0" onClick={editProfile}>
               update Profile
            </button>
            </div>
          ) : (
            <div className="formBody w-full md:w-[70%] grid grid-cols-1 md:grid-cols-2 mt-5 mb-5 gap-5">
              <div className="formgroup">
                <label className="font-bold">Full Name</label>
                <div className=" p-3 bg-gray-50 w-full border-gray-300 border rounded">
                  {/* {isLoggedin?.data?.fullName} */}
                  Emmanuel
                </div>
              </div>
              <div className="formgroup">
                <label className="font-bold">Email</label>
                <div className=" p-3 bg-gray-50 w-full border-gray-300 border rounded">
                  {/* {isLoggedin?.data?.email} */}
                  Emmanuelidus@gmail.com
                </div>
              </div>
              <div className="formgroup">
                <label className="font-bold">Phone Number</label>
                <div className=" p-3 bg-gray-50 w-full border-gray-300 border rounded">
                  {/* {isLoggedin?.data?.phoneNumber} */}
                  08101725687
                </div>
              </div>

              <div className="formgroup">
                <label className="font-bold">Password</label>
                <div className=" p-3 bg-gray-50 w-full border-gray-300 border rounded">
                  *********
                </div>
              </div>
              <button className="primary__btn w-fit ml-0" onClick={editProfile}>
              {open ? "Cancel" : "Edit Profile"}
            </button>
            </div>
          )}
        
        </div>
      </div>
    </div>
  );
}
