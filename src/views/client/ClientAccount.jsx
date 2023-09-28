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
  const mylinks = [
    "mentors",
    "mentees",
    "account",
    "workspace",
  ];
  const [userData, setUserData] = useRecoilState(user);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);

  const isLoggedin = useRecoilValue(user);
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [active, setActive] = useState("profile");

  const editProfile = () => {
    setOpen(!open);
    setPhone(isLoggedin?.data?.phoneNumber);
    setFullName(isLoggedin?.data?.fullName);
  };

  const setTab = (data) => {
    setActive(data);
  };

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
            <div className="flex flex-col gap-4 text-sm ">
              <div
                className={
                  active === "profile"
                    ? "font-bold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => setTab("profile")}
              >
                Personl Profile
              </div>
              <div
                className={
                  active === "invoice"
                    ? "font-bold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => setTab("invoice")}
              >
                Invoice
              </div>
            </div>
            <div className="">
              {active === "profile" ? (
                <div className="">
                  <h2 className="font-black text-xl">My Account</h2>
                </div>
              ) : (
                ""
              )}

              {active === "invoice" ? (
                <div className="rounded-lg h-[700px] w-full">
                  <div className="">
                    <div className="">
                      <h2 className="font-black text-xl">All Invoices</h2>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
