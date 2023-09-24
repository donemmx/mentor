import TopCard from "../../component/TopCard";
import { Avatar } from "primereact/avatar";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";

export default function ClientAccountTwo() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];

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

  return (
    <div className="bg-gray-100">
      <TopCard
        links={mylinks}
        homeLink={"/dashboard"}
        title={"My account"}
        base={"signin"}
        subtitle={"Manage your account"}
      />
      <div className="w-[90%] mx-auto mt-5 p-6">
        <div className="profile__body pt-[2vh]  h-[100%]  lex-col m-auto ">
          <div className="name flex items-center gap-2">
            <Avatar
              label='EI'
              size="xlarge"
              shape="circle"
            />
            <p>{isLoggedin?.data?.email}</p>
          </div>

          <div className="flex flex-wrap gap-5 bg-[red] justify-between py-5"> 
          {open ? (
            <div className="formBody w-full md:w-[70%] bg-[green] grid grid-cols-1 md:grid-cols-2 mt-5 mb-5 gap-5">
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
                  value={phone}
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
            <div className="formBody w-full md:w-[40%] grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#ffffff] p-3 rounded-lg ">
              <h3 className="bg-gray-300 py-3 px-1 rounded">Profile Data</h3>
              <div className="formgroup">
                <label className="font-bold">Full Name</label>
                <div className=" border-gray-300">
                  {/* {isLoggedin?.data?.fullName} */}
                  Emmanuel
                </div>
              </div>
              <div className="formgroup">
                <label className="font-bold">Email</label>
                <div className=" border-gray-300">
                  {/* {isLoggedin?.data?.email} */}
                  Emmanuelidus@gmail.com
                </div>
              </div>
              <div className="formgroup">
                <label className="font-bold">Phone Number</label>
                <div className=" border-gray-300">
                  {/* {isLoggedin?.data?.phoneNumber} */}
                  08101725687
                </div>
              </div>

              <div className="formgroup">
                <label className="font-bold">Password</label>
                <div className=" border-gray-300">
                  *********
                </div>
              </div>
              {/* <button className="primary__btn w-fit ml-0" onClick={editProfile}>
              {open ? "Cancel" : "Edit Profile"}
            </button> */}
            </div>
          )}
            <h3 className="bg-gray-300 py-3 px-1">Edit Profile Infomation</h3>
            <div className="w-full md:w-[55%] border rounded-lg py-5 h-full">
              <div>
                
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
