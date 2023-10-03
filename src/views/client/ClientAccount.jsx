import TopCard from "../../component/TopCard";
import { Avatar } from "primereact/avatar";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { workspaceStore } from "../../atom/workspaceAtom";
import defaultLogo from "../../assets/bg/welcome-bg.png";
import { getInvoiceByWorkspace, getWorkspace } from "../../utils/api";
import { authState } from "../../atom/authAtom";
import moment from "moment";
import Loading from '../../component/loading/Loading'
import ProfileAccount from "../../component/profileAccount/ProfileAccount";

export default function ClientAccount() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const [userData, setUserData] = useRecoilState(user);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
  const [workspace, setWorkspace] = useState([]);
  const [ edit, setEdit ] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  const [active, setActive] = useState("profile");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const setTab = (data) => {
    setActive(data);
  };
console.log(auth)
console.log(userData)
  const getInvoices = () => {
    setLoading(true);

    const payload = {
      sessionID: auth?.sessionID,
    };
    let allInvoices = []
    getWorkspace(payload).then((res) => {
      setWorkspace(res.payload);
      res.payload?.forEach((data) => {
        const myPayload = {
          sessionID: auth?.sessionID,
          id: data.id,
        };
        getInvoiceByWorkspace(myPayload).then((invoice) => {
          allInvoices.push(...invoice.payload);
        }).catch((res) =>  console.log(res))
      });
      if(allInvoices?.length > 0){
        setLoading(false);
        setInvoices(allInvoices);
        console.log(allInvoices);
      }
    }).catch((res)=> {
      console.log(res);
    })
  }

  const getProfileData = () =>{
    const payload = {
      sessionID: auth?.sessionID,
      email : userData.id
    }
  //   getProfile()

  }
  
  useEffect(()=> {
    getInvoices()
  }, [])


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
                Personal Profile
              </div>
              <div
                className={
                  active === "invoice"
                    ? "font-bold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => (setTab("invoice"), getInvoices())}
              >
                Invoice
              </div>
            </div>

            <div className="">
              {active === "profile" ? (
                <div className="">
                  <h2 className="font-black text-xl">My Account</h2>

                    {edit === false ? 
                    (<ProfileAccount />)
                      :
                      ""
                    }

                </div>
              ) : (
                ""
              )}

              {active === "invoice" ? (
                <div className="rounded-lg h-[700px] w-full">
                  <div className="">
                    <div className="">
                      <h2 className="font-black text-xl">All Invoices</h2>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 mt-8">
                          {loading ? (
                            <Loading />
                          ) : (
                            <>
                              {invoices?.map((data, i) => (
                                <div
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                                  key={i}
                                >
                                  <div className="flex items-center gap-4">
                                    <i className="pi pi-folder !text-xl"></i>
                                    <div className="">
                                      <h3 className="text-sm font-bold">
                                        {" "}
                                        {data.tariffId.title}{" "}
                                      </h3>
                                      <div className="text-xs">
                                        {moment(data.dateCteated).fromNow()}
                                      </div>
                                    </div>
                                  </div>
                                  <i className="pi pi-download cursor-pointer"></i>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
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
