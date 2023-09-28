import { ColorPicker, Dropdown } from 'antd';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import React from 'react'
import { registerUserAtom } from '../../atom/registrationAtom';
import { useRecoilState } from 'recoil';
import { workspaceStore } from '../../atom/workspaceAtom';
import { MultiSelect } from 'primereact/multiselect';
import { useState } from 'react';
import { createWorkspaceWithPayment, editRequestWorkspaceUser } from '../../utils/api';
import { toast } from 'react-toastify';
import { addWorkSpaceStore } from '../../atom/addWorkspace';
import { useEffect } from 'react';

export default function EditWorkspaceForm() {
    const [reg, setReg] = useRecoilState(registerUserAtom);
    const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
    const [numbers, setNumbers] = useState([]);
    const [fileDataURL] = useState(null);
    const [color, setColor] = useState();
    const [match, setMatches] = useState([]);
    const [file, setFile] = useState(null);
    const [addWorkspace, setAddWorkspace] = useRecoilState(addWorkSpaceStore);
    const [image, setImage] = useState(null);


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
    


    const onSubmit = async (values) => {
        console.log(values.workspace);
        if (values.workspace) {
          const payload = {
            ...reg,
            workspace: {
              ...values,
            },
          };
          setReg(payload);
          // navigate("");
          console.log(reg, "reg\n\n");
        }
        console.log(reg);
        // setVisible(true);
    };

    
    const initialValues = {
        workspace: "",
        maxMentors: "",
        maxMentees: "",
    };

    const edit = () => {
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

        
    
    
    
    
        editRequestWorkspaceUser(userPayload).then((res) => {
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
            
                // navigate("/welcome");
            });
        };
        
        // };
// const payload = {
//     step: 0,
// };
// setReg(payload);
// toast.success("successful");

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
        initialValues: initialValues,
        // validationSchema:stage2,
        onSubmit,
      });
        
    useEffect(() => {
        let fileReader,
        isCancel = false;
        if (file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
            setImage(result);
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
        <div className="rounded-lg h-[700px] w-full">
            <h2 className="font-black text-xl">
            Edit Your Workspace
            </h2>
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
                    <label htmlFor="username">
                        {workspaceData.name}{" "}
                    </label>
                    </span>

                    {errors.workspace && touched.workspace && (
                    <p className="error">{errors.workspace}</p>
                    )}

                    <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="p-float-label"
                    >
                    <InputText
                        id="username"
                        name="maxMentors"
                        value={values.maxMentors}
                        options=''
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
                    <InputText
                        id="username"
                        name="maxMentees"
                        value={values.maxMentees}
                        options=''
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
                            ("null");
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
                            onChange={(e) => setColor(e.value)}
                        />
                        <label htmlFor="username">
                            {" "}
                            Select a Color{" "}
                        </label>
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
                        <label htmlFor="username">
                            Select a Matching Criteria
                        </label>
                        </span>

                        <button
                        data-aos="fade-down"
                        data-aos-duration="800"
                        className="primary__btn"
                        // disabled={
                        //     !color || !file || matches.length === 0
                        // }
                        onClick={edit}
                        >
                        Proceed
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        // <div>EditWorkspaceForm</div>
    )
}
