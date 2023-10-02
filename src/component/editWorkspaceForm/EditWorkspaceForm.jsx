import { ColorPicker } from "antd";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { workspaceStore } from "../../atom/workspaceAtom";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import { editRequestWorkspaceUser } from "../../utils/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { workspace1 } from "../../utils/Validation";
import { Dropdown } from "primereact/dropdown";
import { user } from "../../atom/userAtom";

export default function EditWorkspaceForm() {
  const workspaceData = useRecoilValue(workspaceStore);
  const userData = useRecoilValue(user)
  const [numbers, setNumbers] = useState([]);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [color, setColor] = useState();
  const [match, setMatches] = useState([]);
  const [file, setFile] = useState(null);
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
    const userPayload = {
      _creatorId: userData.id,
      _description: "",
      _maxMentee: "",
      _maxMentor: "",
      _name: values.workspace,
      id: workspaceData.id,
      maxMentors: values.maxMentors,
      maxMentees: values.maxMentees,
      workspaceLogo: fileDataURL,
      color: color,
      _action: "createWithPayment",
    };
  };

  const initialValues = {
    workspace: "",
    maxMentors: "",
    maxMentees: "",
  };

  const loadedValues = {
    workspace: workspaceData.name,
    maxMentors: "",
    maxMentees: "",
  };

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
    initialValues: loadedValues,
    validationSchema: workspace1,
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

  useEffect(() => {
    var my_array = [];
    for (let i = 1; i <= 100; i++) {
      my_array.push(i);
    }
    setNumbers(my_array);
  }, []);


  useEffect(()=> {
    setColor(workspaceData.color)
    setFileDataURL(workspaceData.logo)
  }, [])

  return (
    <div className="rounded-lg h-[700px] w-full">
      <h2 className="font-black text-xl">Edit Your Workspace</h2>
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-2 pt-8 w-[60%]">
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
              <label htmlFor="username">Workspace name</label>
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
                    alt=""
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
                <span className=" flex items-center gap-2 mb-5">
                  <ColorPicker
                    value={color}
                    onChange={(e) => setColor(e.value)}
                  />
                  <label htmlFor="username"> Select a Color </label>
                </span>

                <span className="p-float-label">
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
                  className="primary__btn"
                  // disabled={
                  //     !color || !file || matches.length === 0
                  // }
                >
                  Proceed
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div>EditWorkspaceForm</div>
  );
}
