import {
  getInvoiceByWorkspace,
  getProfile,
  getWorkspace,
} from "../../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { authState } from "../../atom/authAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TopCard from "../../component/TopCard";
import ThemeCard from "../../component/themeCard/ThemeCard";
import WorkspaceListCard from "../../component/workspaceCard/WorkspaceListCard";
import defaultLogo from "../../assets/bg/welcome-bg.png";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import PricingFormOne from "../../component/addWorkspaceForm/PricingFormOne";
import { addWorkSpaceStore } from "../../atom/addWorkspace";
import PricingFormTwo from "../../component/addWorkspaceForm/PricingFormTwo";
import PricingFormThree from "../../component/addWorkspaceForm/PricingFormThree";
import EditWorkspaceForm from "../../component/editWorkspaceForm/EditWorkspaceForm";
import moment from "moment/moment";
import ClientDynamicForm from "../../component/dynamicForm/ClientDynamicForm";
import ProfessionalArea from "../../component/professional/ProfessionalArea"

export default function ClientWorkspace() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const workspaceData = useRecoilValue(workspaceStore);
  const [userData, setUserData] = useRecoilState(user);
  const [active, setActive] = useState("userForm");
  const [workspace, setWorkspace] = useState([]);

  const matches = [
    "Area of Specilization",
    "Province",
    "Years of Professional Experience",
  ];
  const [selectWorkspace, setSelectWorkspace] = useState();

  const [auth, setAuth] = useRecoilState(authState);
  const [invoices, setInvoices] = useState([]);

  const [addWorkspace, setAddWorkspace] = useRecoilState(addWorkSpaceStore);
  const initialValues = {
    workspace: "",
    maxMentors: "",
    maxMentees: "",
  };


  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
  } = useFormik({
    validateOnMount: true,
    initialValues: initialValues,
    onSubmit,
  });

  const setTab = (data) => {
    setActive(data);
  };

  const listMyWorkspace = () => {
    const payload = {
      sessionID: auth?.sessionID,
    };
    getProfile(payload).then((res) => {
      setUserData(res.payload[0]);
    });

    getWorkspace(payload).then((res) => {
      setWorkspace(res.payload);
    });

  };

  const getInvoice  = () => {
    const myPayload = {
      sessionID: auth?.sessionID,
      id: workspaceData.id,
    };
    getInvoiceByWorkspace(myPayload).then((res) => {
      setInvoices(res.payload);
    });
  }

  const defaultStep = () => {
    const payload = {
      step: 0,
    };
    setAddWorkspace(payload);
  };

  useEffect(() => {
    listMyWorkspace();
  }, []);

  return (
    <div>
      <div className="">
        {/* HEADER */}

        <TopCard
          links={mylinks}
          homeLink={"/dashboard"}
          base={"signin"}
          title={"My Workspace"}
          subtitle={"Manage your workspace"}
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
                    {workspaceData?.name}
                  </div>

                  <div className="text-xs py-2 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium, sapiente?
                  </div>
                </div>
                <button className="h-[40px] w-full bg-gray-700 text-white flex items-center justify-center gap-2 rounded mt-auto text-sm ">
                  <i className="pi pi-plus-circle "></i>
                  Upgrade
                </button>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="grid lg:grid-cols-[2fr,10fr] gap-4 ">
              <div className="flex flex-col gap-4 text-sm ">
                <div
                  className={
                    active === "userForm"
                      ? "font-bold cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => setTab("userForm")}
                >
                  User Form
                </div>
                <div
                  className={
                    active === "edit"
                      ? "font-bold cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => setTab("edit")}
                >
                  Edit Workspace
                </div>
                <div
                  className={
                    active === "add"
                      ? "font-bold cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => (setTab("add"), defaultStep())}
                >
                  Add Workspace
                </div>
                <div
                  className={
                    active === "switch"
                      ? "font-bold cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => setTab("switch")}
                >
                  Switch Workspace
                </div>
                <div
                  className={
                    active === "invoice"
                      ? "font-bold cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => (setTab("invoice"), getInvoice())}
                >
                  Invoice
                </div>
                <div
                  className={
                    active === "theme"
                      ? "font-bold cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => setTab("theme")}
                >
                  Themes
                </div>
                <div
                  className={
                    active === "professional"
                      ? "font-bold cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => (setTab("professional"))}
                >   
                Professional Areas             
                </div>
              </div>
              <div className="">
                {active === "userForm" ? (
                  <ClientDynamicForm />

                ) : active === "invoice" ? (
                <div className="">
                    <h2 className="font-black text-xl ">Workspace Invoices</h2>
                    <div className="mt-8">
                      {invoices?.map((data, i) => (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md" key={i}>
                          <div className="flex items-center gap-4">
                            <i className="pi pi-folder !text-xl"></i>
                            <div className="">
                                 <h3 className="text-lg font-bold"> {data.tariffId.title} </h3>
                                <div className="text-xs">{moment(data.dateCteated).fromNow()}</div>
                            </div>
                          </div>
                          <i className="pi pi-download cursor-pointer"></i>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : active === "theme" ? (
                  <div className="">
                    <h2 className="font-black text-xl ">Select A Theme</h2>
                    <div className="my-10 grid grid-cols-3 gap-6">
                      {[1].map((res) => (
                        <ThemeCard />
                      ))}
                    </div>
                  </div>
                ) : active === "switch" ? (
                  <div className="">
                    <h2 className="font-black text-xl">
                      Select Your Workspace
                    </h2>
                    <div className="w-full">
                      <div className="w-full grid grid-cols-2 gap-4 ">
                        {workspace?.map((res, i) => (
                          <WorkspaceListCard data={res} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : active === "edit" ? (
                    <EditWorkspaceForm />
                ) : active === "professional" ? (
                    <ProfessionalArea />
                ) : active === "domain" ? (
                  <div className="rounded-lg h-[700px] w-full">
                    <h2 className="font-black text-xl">
                      Add Custom Domain to Workspace
                    </h2>
                    <div className="">
                      <div className="">
                        <div className="space-y-2 pt-8 w-[60%]">
                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <Dropdown
                              id="username"
                              name="workspace"
                              options={workspace}
                              onChange={(e) => setSelectWorkspace(e.target.va)}
                            />
                            <label htmlFor="username">List of Workspace</label>
                          </span>

                          {errors.maxMentees && touched.maxMentees && (
                            <p className="error">{errors.maxMentees}</p>
                          )}

                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="workspace"
                              value={values.workspace}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label htmlFor="username">Workspace Url</label>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : active === "add" ? (
                  <div className="">
                    {addWorkspace.step === 0 ? (
                      <PricingFormOne />
                    ) : addWorkspace.step === 1 ? (
                      <PricingFormTwo />
                    ) : addWorkspace.step === 2 ? (
                      <PricingFormThree />
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                {/* </div>/ */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
