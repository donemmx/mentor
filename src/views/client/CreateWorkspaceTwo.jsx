/* eslint-disable jsx-a11y/alt-text */
import ClientHeader from "./ClientHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import line from "../../assets/bg/lines.svg";
import { MultiSelect } from "primereact/multiselect";
import { createWorkspaceWithPayment, login } from "../../utils/api";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { authState } from "../../atom/authAtom";
import { ColorPicker } from "antd";

export default function CreateWorkspaceTwo() {
  const navigate = useNavigate();
  const [match, setMatches] = useState([]);
  const [color, setColor] = useState("000000");
  const [loading, setLoading] = useState(false);
  const matches = [
    "Area of Specilization",
    "Province",
    "Years of Professional Experience",
  ];

  const [file, setFile] = useState(null);
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const [auth, setAuth] = useRecoilState(authState);

  const [fileDataURL, setFileDataURL] = useState(null);
  const getImage = (e) => {
    const fileData = e.target.files[0];
    setFile(fileData);
 
  };

  const register = () => {

    setLoading(true);
    const userPayload = {
      name: reg.workspace.workspace,
      maxMentors: reg.workspace.maxMentors,
      maxMentees: reg.workspace.maxMentees,
      workspaceLogo: fileDataURL,
      color: color.split('#')[1],
      invoice: reg.id,
      description: '',
      lastName: reg.user.lastName,
      firstame: reg.user.firstName,
      newMail: reg.user.email,
      mail: reg.user.email,
      _fiirstProfArea: reg.workspace.professionalArea,
      _password: reg.user.confirmPassword,
      _phone: reg.user.phone,
      _country: reg.user.country,
      _provinceId: reg.user.province,
      _postalcode: reg.user.postalcode,
      _action: "createWithPayment",
      _actionType_input: true,
      _url: `${window.location.origin}/payments/${reg.workspace.id}`,
    };

    createWorkspaceWithPayment(userPayload)
      .then((res) => {
        setLoading(false);
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
        login(email, password).then((res) => {
          setAuth(res);
          setReg(null)
          navigate("/welcome");
        }).catch((err)=> {
          setLoading(false)
          toast.error(err.response.data.msg);
        })
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.msg);
      });
  };

  useEffect(() => {
    console.log(color);
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <div className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="  line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-white"></div>
              </div>
              <div className="steps">
                <div className="font-light">Create workspace</div>
                <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                  Step 2
                </div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className="w-[70%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
                Upload Logo and select Matching Criteria
              </h3>
              {fileDataURL !== null ? (
                <d>
                  <img
                    src={fileDataURL}
                    className="h-[100px] w-[200px] object-cover border-[1px] my-3 rounded-md"
                  />
                  <div
                    className="underline cursor-pointer"
                    onClick={() => {
                      setFileDataURL(null);
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
                   <ColorPicker
                    value={color}
                    onChange={(value, color) => setColor(color)}
                    allowClear
                    disabledAlpha
                  />
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
                  disabled={!color || !file || matches.length === 0 || loading}
                  onClick={register}
                >
                  {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
                  Proceed
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 z-0  h-[70vh]">
              <img className=" h-full w-full object-cover" src={line} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
