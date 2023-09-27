import React, { useEffect, useState } from 'react'
import { createWorkspaceWithPayment, getPricing, login } from '../../utils/api'
import WorkspacePricingCard from '../pricingCard/WorkspacePricingCard'
import { InputText } from 'primereact/inputtext';
import { ColorPicker, Dropdown } from 'antd';
import { useRecoilState } from 'recoil';
import { registerUserAtom } from '../../atom/registrationAtom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { authState } from '../../atom/authAtom';
import { addWorkSpaceStore } from '../../atom/addWorkspace';
import { user } from '../../atom/userAtom';

export default function PricingFormThree() {
    
    const [match, setMatches] = useState([]);
  const [color, setColor] = useState();
  const [addWorkspace, setAddworkspace] = useRecoilState(addWorkSpaceStore);
  const [userData, setUserData] = useRecoilState(user);
  const matches = [
    "Area of Specilization",
    "Province",
    "Years of Professional Experience",
  ];

  const [file, setFile] = useState(null);
  const [auth, setAuth] = useRecoilState(authState);

  const [fileDataURL, setFileDataURL] = useState(null);
  const getImage = (e) => {
    const fileData = e.target.files[0];
    setFile(fileData);
    console.log(fileData);
  };

  console.log(userData, 'Thi is the user data')

  
  const register = ()=>{
      const userPayload = {
        name: addWorkspace.workspace.workspace,
        maxMentors: addWorkspace.workspace.maxMentors,
        maxMentees: addWorkspace.workspace.maxMentees,
        workspaceLogo: fileDataURL, 
        color: color,
        lastName: userData.lastName,
        firstame: userData.firstName,
        newMail: userData.email,
        mail: userData.email,
        _password: userData.confirmPassword,
        _phone: userData.phone,
        _country: userData.country,
        _provinceId: userData.province,
        _postalcode: userData.postalcode,
        _action: "createWithPayment",
        _url: `${window.location.origin}/payments/`
      };
      createWorkspaceWithPayment(userPayload).then((res) => {
        toast.success("successful");
        const payload = {
          ...addWorkspace,
          workspace: {
            ...res.workspace,
            id: res.result[0].workspaceId,
            userId: res.result[0].id,
          },
        };
        setAddworkspace(payload);
        const { email, password } = addWorkspace?.user;
        login(email, password).then((res)=> {
          setAuth(res)
        //   navigate("/welcome");
        })
      });
    }
  

  useEffect(() => {
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
        <div>
            <div>
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

  )
}
