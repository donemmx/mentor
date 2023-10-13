import { ColorPicker } from "primereact/colorpicker";
import { useFormik } from "formik";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useState } from "react";
import { ownerWorkspaceEdit } from "../../utils/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { workspace1 } from "../../utils/Validation";
import { Dropdown } from "primereact/dropdown";
import { user } from "../../atom/userAtom";
import { authState } from "../../atom/authAtom";
import { useNavigate } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";

export default function EditWorkspaceForm() {
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
  const userData = useRecoilValue(user);
  const [numbers, setNumbers] = useState([]);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [newColor, setNewColor] = useState("000000");
  const [file, setFile] = useState(null);
  const auth = useRecoilValue(authState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

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
    setLoading(true);
    // const userPayload = {
    //   _creatorId: userData.id,
    //   _description: "",
    //   _maxMentee: values.maxMentees,
    //   _maxMentor: values.maxMentors,
    //   _name: values.workspace,
    //   id: workspaceData.id,
    //   logo: fileDataURL,
    //   maxMentee: values.maxMentors,
    //   maxMentor: values.maxMentees,
    //   color: newColor,
    // };

    const userPayload = {
      _creatorId: userData.id,
      _description: description,
      _maxMentee: values.maxMentees,
      _maxMentor: values.maxMentors,
      id: workspaceData.id,
      logo: fileDataURL,
      maxMentee: values.maxMentors,
      maxMentor: values.maxMentees,
      color: newColor,
    };

    ownerWorkspaceEdit(userPayload).then(() => {
      setLoading(false);
      navigate("/list-workspace");
    });
  };

  const loadedValues = {
    workspace: workspaceData.name,
    maxMentors: workspaceData._maxMentor,
    maxMentees: workspaceData._maxMentee,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
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

  useEffect(() => {
    setNewColor(workspaceData.color);
    setFileDataURL(workspaceData.logo);
  }, []);

  return (
    <div className="rounded-lg h-[700px] w-full">
      <h2 className="font-black text-xl">Edit Your Workspace</h2>
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-2 pt-8 w-[60%]">
            {/* <span
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
            )} */}

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

            <span
              data-aos="fade-down"
              data-aos-duration="1000"
              className="p-float-label"
            >
                <InputTextarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  cols={30}
                />
              <label htmlFor="username">Description</label>
            </span>

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
                <span className=" flex items-center gap-2 mb-5">
                  <ColorPicker
                    value={newColor}
                    onChange={(e) => setNewColor(e.value)}
                  />
                  <label htmlFor="username"> Select a Color </label>
                </span>

                <button
                  type="button"
                  className="primary__btn flex items-center gap-4"
                  disabled={!newColor || !fileDataURL || loading || !description}
                >
                  {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
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
