import { getProfile, getUserWorkspace, getWorkspace } from "../../utils/api";
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
import { registerUserAtom } from "../../atom/registrationAtom";
import { useFormik } from "formik";
import { stage2 } from "../../utils/Validation";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { ColorPicker } from 'primereact/colorpicker';
import { MultiSelect } from "primereact/multiselect";
import { createWorkspaceWithPayment, login } from "../../utils/api";
import { toast } from "react-toastify";


export default function ClientWorkspace() {
    const [visible, setVisible] = useState(false);
 
    const mylinks = ["mentors", "mentees", "account", "workspace"];
    const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
    const [userData, setUserData ] = useRecoilState(user);
    const navigate = useNavigate();
    const [numbers, setNumbers] = useState([]);

    const [active, setActive] = useState("edit");
    const [workspace, setWorkspace] = useState([]);
    const [match, setMatches] = useState([]);
    const [color, setColor] = useState();

    const [file, setFile] = useState(null);
    const [reg, setReg] = useRecoilState(registerUserAtom);
    const [auth, setAuth] = useRecoilState(authState);

    const [fileDataURL, ] = useState(null);
    // For adding workspace step 1
    
    const onSubmit = async (values) => {
        console.log(values.workspace)
        if (values.workspace) {
            const payload = {
            ...reg,
            workspace: {
                ...values,
            },
            };
            setReg(payload);
            // navigate("");
            console.log(reg, 'reg\n\n')
        }
        console.log(reg)
        setVisible(true)
    };

    const initialValues = {
        workspace: "",
        maxMentors: "",
        maxMentees: "",
    };

    // For adding workspace step 2
    

    const matches = [
        "Area of Specilization",
        "Province",
        "Years of Professional Experience",
    ];

    const getImage = (e) => {
        const fileData = e.target.files[0];
        setFile(fileData);
        console.log(fileData);
    };







    const setTab = (data) => {
        setActive(data)
    };

    const editOwnerWorkspaseEdit = ''

    const listMyWorkspace = () => {
        const payload = {
          sessionID: auth?.sessionID,
        }; 
        getProfile(payload).then((res)=> {
          setUserData(res.payload[0])
        })
        // getUserWorkspace(payload).then((res) => {
        //   setWorkspace(res.payload);   
        // });
        getWorkspace(payload).then((res) => {
          setWorkspace(res.payload);   
        });
        
      };
         
    
      useEffect(() => {
        listMyWorkspace();
      }, []); 


      const register = ()=>{
        const userPayload = {
          name: reg.workspace.workspace,
          maxMentors: reg.workspace.maxMentors,
          maxMentees: reg.workspace.maxMentees,
          workspaceLogo: fileDataURL, 
          color: color,
          lastName: reg.user.lastName,
          firstame: reg.user.firstName,
          newMail: reg.user.email,
          mail: reg.user.email,
          _password: reg.user.confirmPassword,
          _phone: reg.user.phone,
          _country: reg.user.country,
          _provinceId: reg.user.province,
          _postalcode: reg.user.postalcode,
          _action: "createWithPayment",
        };
        createWorkspaceWithPayment(userPayload).then((res) => {
          toast.success("successful");
          const payload = {
            ...reg,
            workspace: {
              ...res.workspace,
              id: res.result[0].workspaceId,
              userId: res.result[0].id,
            },
          };
          setReg(payload);
          const { email, password } = reg?.user;
          login(email, password).then((res)=> {
            setAuth(res)
            navigate("/welcome");
          })
        });
      }

      const {
        values,
        errors,
        isValid,
        isSubmitting,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      } = useFormik({
        validateOnMount: true,
        initialValues:initialValues,
        // validationSchema:stage2,
        onSubmit,
      });
    
      console.log(workspaceData, 'workspaceData\n')
    //   console.log(workspace, 'workspace\n')
    //   console.log(userData, 'userdata\n')

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
                        <div className="card p-10 border-[1px] relative border-gray-50 bg-gray-100 text-black h-[300px] w-[300px] rounded-lg ">
                            <div className="h-full flex flex-col justify-between  ">
                                <div className="">
                                <div className=" absolute top-4 right-2 h-[50px] w-[50px] flex items-start">
                                        <img src={workspaceData?.logo ? workspaceData?.logo : defaultLogo} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="title text-xl font-bold flex items-center gap-2 ">
                                        <i className="pi pi-cog pi-spin "></i>
                                       {workspaceData?.name}
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
                                {/* <div className=" "> */}
                                    {active === "switch" ? 
                                    <div className="">
                                        <h2 className="font-black text-xl">Select Your Workspace</h2>
                                        <div className="w-full">
                                        
                                            <div className="w-full grid grid-cols-2 gap-4 ">
                                            {workspace?.map((res, i) => (
                                                <WorkspaceListCard data={res}  />
                                            ))}
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    ""
                                    }

                                    {active === "edit" ? 
                                    <div className="rounded-lg h-[700px] w-full">
                                        <div className="">
                                            <div className="">
                                                
                                            <div className="space-y-2 pt-8 w-[60%]">
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
                                                    <label htmlFor="username">{workspaceData.name} </label>
                                                </span>

                                                {errors.workspace && touched.workspace && (
                                                    <p className="error">{errors.workspace}</p>
                                                )}

                                                <span
                                                    data-aos="fade-down"
                                                    data-aos-duration="1000"
                                                    className="p-float-label"
                                                >
                                                    <Dropdown
                                                    id="username"
                                                    name="maxMentors"
                                                    value={values.maxMentors}
                                                    options={numbers}
                                                    onChange={handleChange}
                                                    />
                                                    <label htmlFor="username">Max Mentors</label>
                                                </span>

                                                {errors.maxMentors && touched.maxMentors && (
                                                    <p className="error">{errors.maxMentors}</p>
                                                )}
                                                <span
                                                    data-aos="fade-down"
                                                    data-aos-duration="1000"
                                                    className="p-float-label"
                                                >
                                                    <Dropdown
                                                    id="username"
                                                    name="maxMentees"
                                                    value={values.maxMentees}
                                                    options={numbers}
                                                    onChange={handleChange}
                                                    />
                                                    <label htmlFor="username">Max Mentees</label>
                                                </span>

                                                {errors.maxMentees && touched.maxMentees && (
                                                    <p className="error">{errors.maxMentees}</p>
                                                )}
                                                
                                                <div>
                                              
                                                    {fileDataURL !== null ? (
                                                        <d>
                                                        <img
                                                            src={fileDataURL}
                                                            className="h-[100px] w-[200px] object-cover border-[1px] my-3 rounded-md"
                                                        />
                                                        <div
                                                            className="underline cursor-pointer"
                                                            onClick={() => {
                                                            ('null');
                                                            }}
                                                        >
                                                            Remove Image
                                                        </div>
                                                        </d>
                                                    ) : (
                                                        <div className="flex flex-col gap-3 mt-10">
                                                        <input
                                                            type="file"
                                                            id="image"
                                                            accept=".png, .jpg, .jpeg"
                                                            onChange={(e) => getImage(e)}
                                                            className=""
                                                        />
                                                        </div>
                                                    )}

                                                    
                                                    <div className="space-y-2 pt-8 w-[60%]">
                                                    <span
                                                        data-aos="fade-down"
                                                        data-aos-duration="1000"
                                                        className=" flex items-center gap-2 mb-5"
                                                        >
                                                    <ColorPicker value={color} onChange={(e) => setColor(e.value)} />
                                                    <label htmlFor="username"> Select a Color </label>
                                                    </span>

                                                        <span
                                                        data-aos="fade-down"
                                                        data-aos-duration="1000"
                                                        className="p-float-label"
                                                        >
                                                        <MultiSelect
                                                            id="username"
                                                            name="name"
                                                            value={match}
                                                            options={matches}
                                                            className=" !text-black !w-full"
                                                            onChange={(e) => setMatches(e.target.value)}
                                                        />
                                                        <label htmlFor="username">Select a Matching Criteria</label>
                                                        </span>

                                                        <button
                                                        data-aos="fade-down"
                                                        data-aos-duration="800"
                                                        className="primary__btn"
                                                        disabled={!color || !file || matches.length === 0}
                                                        onClick={register}
                                                        >
                                                        Proceed
                                                        </button>
                                                    </div>
                                                </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                                    }
                                    {active === "add" ?
                                        <div>
                                            {visible === false ?
                                                <div className="space-y-2 pt-8 w-[60%]">
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
                                                    <label htmlFor="username">Workspace Name</label>
                                                </span>

                                                {errors.workspace && touched.workspace && (
                                                    <p className="error">{errors.workspace}</p>
                                                )}

                                                <span
                                                    data-aos="fade-down"
                                                    data-aos-duration="1000"
                                                    className="p-float-label"
                                                >
                                                    <Dropdown
                                                    id="username"
                                                    name="maxMentors"
                                                    value={values.maxMentors}
                                                    options={numbers}
                                                    onChange={handleChange}
                                                    />
                                                    <label htmlFor="username">Max Mentors</label>
                                                </span>

                                                {errors.maxMentors && touched.maxMentors && (
                                                    <p className="error">{errors.maxMentors}</p>
                                                )}
                                                <span
                                                    data-aos="fade-down"
                                                    data-aos-duration="1000"
                                                    className="p-float-label"
                                                >
                                                    <Dropdown
                                                    id="username"
                                                    name="maxMentees"
                                                    value={values.maxMentees}
                                                    options={numbers}
                                                    onChange={handleChange}
                                                    />
                                                    <label htmlFor="username">Max Mentees</label>
                                                </span>

                                                {errors.maxMentees && touched.maxMentees && (
                                                    <p className="error">{errors.maxMentees}</p>
                                                )}

                                                <button
                                                    onClick={onSubmit}
                                                    data-aos="fade-down"
                                                    data-aos-duration="800"
                                                    className="primary__btn"
                                                    disabled={!isValid || isSubmitting}
                                                >
                                                    Proceed
                                                </button>
                                                </div>
                                                :
                                                <div>
                                              
                                                    {fileDataURL !== null ? (
                                                        <d>
                                                        <img
                                                            src={fileDataURL}
                                                            className="h-[100px] w-[200px] object-cover border-[1px] my-3 rounded-md"
                                                        />
                                                        <div
                                                            className="underline cursor-pointer"
                                                            onClick={() => {
                                                            ('null');
                                                            }}
                                                        >
                                                            Remove Image
                                                        </div>
                                                        </d>
                                                    ) : (
                                                        <div className="flex flex-col gap-3 mt-10">
                                                        <input
                                                            type="file"
                                                            id="image"
                                                            accept=".png, .jpg, .jpeg"
                                                            onChange={(e) => getImage(e)}
                                                            className=""
                                                        />
                                                        </div>
                                                    )}

                                                    
                                                    <div className="space-y-2 pt-8 w-[60%]">
                                                    <span
                                                        data-aos="fade-down"
                                                        data-aos-duration="1000"
                                                        className=" flex items-center gap-2 mb-5"
                                                        >
                                                    <ColorPicker value={color} onChange={(e) => setColor(e.value)} />
                                                    <label htmlFor="username"> Select a Color </label>
                                                    </span>

                                                        <span
                                                        data-aos="fade-down"
                                                        data-aos-duration="1000"
                                                        className="p-float-label"
                                                        >
                                                        <MultiSelect
                                                            id="username"
                                                            name="name"
                                                            value={match}
                                                            options={matches}
                                                            className=" !text-black !w-full"
                                                            onChange={(e) => setMatches(e.target.value)}
                                                        />
                                                        <label htmlFor="username">Select a Matching Criteria</label>
                                                        </span>

                                                        <button
                                                        data-aos="fade-down"
                                                        data-aos-duration="800"
                                                        className="primary__btn"
                                                        disabled={!color || !file || matches.length === 0}
                                                        onClick={register}
                                                        >
                                                        Proceed
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                            
                                            {/* <Dialog
                                                header="Invite user"
                                                visible={visible}
                                                onHide={() => setVisible(false)}
                                                className="w-[90%] lg:w-[35vw]"
                                            >
                                                <div className="user  flex flex-col justify-center items-center w-[65%] lg:w-[20%] mx-auto mt-[5vh]">
                                                <h4 className=" font-bold pt-3">Mentee's </h4>
                                                <p className="text-sm text-center text-[#666666]">Invite Link</p>
                                                <p className="text-xs mt-4">Click to copy</p>
                                                </div>
                                                <div className="w-[80%] mx-auto py-5">
                                                <span className="p-float-label">
                                                    <InputText id="username" name="email" />
                                                    <label htmlFor="username">Email</label>
                                                </span>
                                                <button className="primary__btn text-sm mt-5" onClick="">
                                                    Send Invite
                                                </button>
                                                </div>
                                            </Dialog> */}
                                        </div>
                                    :
                                    ""   
                                    }
                                {/* </div>/ */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}