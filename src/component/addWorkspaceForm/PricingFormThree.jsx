import React, { useEffect, useState } from "react";
import { createWorkspaceWithPayment, login } from "../../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { MultiSelect } from "primereact/multiselect";
import { authState } from "../../atom/authAtom";
import { addWorkSpaceStore } from "../../atom/addWorkspace";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { ColorPicker } from "primereact/colorpicker";

export default function PricingFormThree() {
  const [match, setMatches] = useState([]);
  const [color, setColor] = useState();
  const [addWorkspace, setAddworkspace] = useRecoilState(addWorkSpaceStore);
  const userData = useRecoilValue(user);
  const matches = [
    "Area of Specilization",
    "Province",
    "Years of Professional Experience",
  ];

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [auth, setAuth] = useRecoilState(authState);

  const [fileDataURL, setFileDataURL] = useState(null);
  const getImage = (e) => {
    const fileData = e.target.files[0];
    setFile(fileData);
    setFileDataURL(URL.createObjectURL(fileData));
  };

  const navigate = useNavigate();
  const register = () => {
    const userPayload = {
      name: addWorkspace.workspace.workspace,
      maxMentors: addWorkspace.workspace.maxMentors,
      maxMentees: addWorkspace.workspace.maxMentees,
      workspaceLogo: image,
      color: color,
      lastName: userData.lastName,
      firstame: userData.firstName,
      newMail: userData.id,
      mail: userData.id,
      _phone: userData.phone,
      _provinceId: userData.province,
      _postalcode: userData.postalcode,
      _fiirstProfArea: userData.professionalArea,
      _action: "createWithPayment",
      _url: `${window.location.origin}/payments/${addWorkspace.id}`,
    };
    createWorkspaceWithPayment(userPayload).then((res) => {
      const payload = {
        step: 0,
      };
      toast.success("successful");
      navigate('/list-workspace')
    });
  };

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
    <div>
      <div>
        <div>
          {fileDataURL !== null ? (
            <div>
              <img
                src={fileDataURL}
                alt=""
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
            </div>
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
              disabled={!file || matches.length === 0 || !color}
              onClick={register}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
