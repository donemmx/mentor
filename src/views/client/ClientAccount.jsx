import TopCard from "../../component/TopCard";
import { Avatar } from "primereact/avatar";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { workspaceStore } from "../../atom/workspaceAtom";
import defaultLogo from "../../assets/bg/welcome-bg.png";
import { editOwnerProfile, getInvoiceByWorkspace, getProfile, getProvinces, getWorkspace } from "../../utils/api";
import { authState } from "../../atom/authAtom";
import moment from "moment";
import Loading from '../../component/loading/Loading'
import ProfileAccount from "../../component/profileAccount/ProfileAccount";
import { useFormik } from "formik";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { profile } from "../../utils/Validation";
import ChangePasswordInProfile from "../../component/password/ChangePasswordInProfile";

export default function ClientAccount() {
  const mylinks = ["mentors", "mentees", "account", "workspace"];
  const [userData, setUserData] = useRecoilState(user);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
  const [workspace, setWorkspace] = useState([]);
  const [ edit, setEdit ] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const [ profileData, setProfileData ] = useState({})
  const [active, setActive] = useState("profile");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ province, setProvince ] = useState([])
  const [ chgPwd, setChgPwd ] = useState(false)
  const [ viewAction, setViewAction ] = useState([])

  const [ page, setPage ] = useState("")

  
  const setTab = (data) => {
    setActive(data);
  };
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

  const [ gender, setGender ] = useState([])


  const onSubmit = async (values) => {
    const payload = {
      "id": userData.id,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "gender": values.gender,
      "phone": values.phone,
      "linkedin": values.linkedin,
      "city": values.city,
      "postalcode": values.postalcode,
      "profilesummary": values.profilesummary,
      "province": values.province,
      "yearsofprofessionalinterest": values.yearsofprofessionalinterest, 
    }
    editOwnerProfile(payload).then((res)=>{
      setUserData(res.payload)
      console.log(res, 'the response from posting');
    })
  };

  const getProfileData = () =>{
    const payload = {
      sessionID: auth?.sessionID,
      email : userData.id
    }
    getProfile(payload).then((res)=>{
      setProfileData(res.payload[0])
    })
  };

  const initValue = {
    firstName:profileData.firstName,
    lastName:profileData.lastName,
    phone:profileData.phone,
    postalcode:profileData.postalcode,
    province:profileData.province,
  }


  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: false,
    initialValues: initValue,
    validationSchema: profile,
    onSubmit,
  });


  const changeEditButton= () => {
    setEdit(true)
  }

  const dealPassword = () => {
    setChgPwd(!chgPwd)
    console.log('change password button clicked')
  }
  
  var getGender = ['Male', 'Female']

  useEffect(()=> {
    getProfileData()
    setGender(getGender);
    getInvoices()
    setPage('Profile')
    
    getProvinces().then((res)=>{
      setProvince(res.payload)
    })

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
              <button className="h-[40px] w-full bg-gray-700 text-white flex items-center justify-center gap-2 rounded mt-auto text-sm " onClick={changeEditButton}>
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
                onClick={() => (setTab("profile"))}
              >
                Personal Profile
              </div>
              <div
                className={
                  active === "editProfile"
                    ? "font-bold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => (setTab("editProfile"))}
              >
                Edit Profile
              </div>
              <div
                className={
                  active === "changePassword"
                    ? "font-bold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => (setTab("changePassword"))}
              >
                Change Password
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
              {/* <div
                className={
                  active === "invoice"
                    ? "font-bold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => (setTab("invoice"), getInvoices())}
              >
                Invoice
              </div> */}
            </div>

            <div className="">
              <h2 className="font-black text-xl">My Account</h2>
              {active === "profile" ? (
                <div className="">

                  
                  <div className="">  
                    {/* <button className="buttons text-white rounded px-3 py-1 bg-[#F56B3F]" onClick={dealPassword}>Change Password</button> */}
                    <ProfileAccount />
                
                  </div>
                </div>
                ) : active === "editProfile" ? (

                    <form onSubmit={handleSubmit} className="pb-[200px] mx-a h-[150%] w-[400px]">
                    <div className="">
                      <div className=" mx-auto">
                        <div className="space-y-2 pt-8 w-[80%]">
                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label htmlFor="username">First name</label>
                          </span>

                          {errors.firstName && touched.firstName && (
                            <p className="error">{errors.firstName}</p>
                          )}

                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="lastName"
                              value={values.lastName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">Last name</label>
                          </span>

                          {errors.lastName && touched.lastName && (
                            <p className="error">{errors.lastName}</p>
                          )}
                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                              {/* Dropdown */}
                            <InputText
                              id="username"
                              name="gender"
                              value={values.gender}
                              options={gender}
                              // onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">Gender</label>
                          </span>

                          {errors.gender && touched.gender && (
                            <p className="error">{errors.gender}</p>
                          )}
                          
                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="phone"
                              value={values.phone}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">Phone</label>
                          </span>

                          {errors.phone && touched.phone && (
                            <p className="error">{errors.phone}</p>
                          )}
                          
                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="linkedin"
                              value={values.linkedin}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">LinkedIn</label>
                          </span>

                          {errors.linkedin && touched.linkedin && (
                            <p className="error">{errors.linkedin}</p>
                          )}

                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="city"
                              value={values.city}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">City</label>
                          </span>
                          
                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="postalcode"
                              value={values.postalcode}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">Postal Code</label>
                          </span>

                          {errors.postalcode && touched.postalcode && (
                            <p className="error">{errors.postalcode}</p>
                          )}
                          
                          <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="profilesummary"
                              value={values.profilesummary}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">Profile Summary</label>
                          </span>

                          {errors.profilesummary && touched.profilesummary && (
                            <p className="error">{errors.profilesummary}</p>
                          )}

                          {errors.city && touched.city && (
                            <p className="error">{errors.city}</p>
                          )}

            <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            
                            {/* Dropdown */}
                            {/* <Dropdown
                                id="username"
                                name="province"
                                value={values.province}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                options={province}
                                optionLabel="Province"
                                optionValue="Province"
                                className=" !text-black"
                                filter
                              /> */}
                            <InputText
                              id="username"
                              name="province"
                              value={values.province}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">Province</label>
                          </span>

                          {errors.province && touched.province && (
                            <p className="error">{errors.province}</p>
                          )}
                            
                          
                            <span
                            data-aos="fade-down"
                            data-aos-duration="1000"
                            className="p-float-label"
                          >
                            <InputText
                              id="username"
                              name="yearsofprofessionalinterest"
                              value={values.yearsofprofessionalinterest}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label htmlFor="username">Years of Professional Interest</label>
                          </span>

                          {errors.yearsofprofessionalinterest && touched.yearsofprofessionalinterest && (
                            <p className="error">{errors.yearsofprofessionalinterest}</p>
                          )}

                          <button
                            onClick={onSubmit}
                            data-aos="fade-down"
                            data-aos-duration="800"
                            className="primary__btn"
                            // disabled={!isValid || isSubmitting}
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 z-0  h-[70vh]">
                        <img className=" h-full w-full object-cover" src={"line"} alt="" />
                      </div>
                    </div>
                  </form>
                ) : active === "changePassword" ? (
                      <ChangePasswordInProfile />

                ) : active === "invoice" ? (
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
