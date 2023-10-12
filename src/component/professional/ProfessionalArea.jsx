import React, { useEffect, useState } from "react";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import {
  getProfAreasByWorkSpace,
  professionalAreaAction,
} from "../../utils/api";
import { authState } from "../../atom/authAtom";
import { InputText } from "primereact/inputtext";

export default function ProfessionalArea() {
  const [profArea, setProfArea] = useState();
  const [open, setOpen] = useState(false);
  const [newArea, setNewArea] = useState(false);
  const [area, setArea] = useState();
  const [fullInfo, setFullInfo] = useState();
  const workspace = useRecoilValue(workspaceStore);
  const auth = useRecoilValue(authState);

  const getProfessionalAreas = () => {
    const payload = {
      id: workspace.id,
      sessionID: auth.sessionID,
    };
    getProfAreasByWorkSpace(payload).then((res) => {
      setProfArea(res.payload);
    });
  };

  const openEdit = (data) => {
    setOpen(!open);
    setArea(data.area_title);
    setFullInfo(data);
  };

  const createNewArea = (data) => {
    setNewArea(true);
    setOpen(false);
    // setArea(data.area_title);
    // setFullInfo(data);
  };

  const renameProfArea = () => {
    const payload = {
      _action: "rename",
      _creatorId: auth.username,
      _newName: area,
      area_title: area,
      _url: `${window.location.origin}/${workspace.id}`,
      professional_areaId: fullInfo.id,
    };
    professionalAreaAction(payload).then((res) => {
      getProfessionalAreas();
    });
  };

  const createProfArea = () => {
    const payload = {
      _action: "createAuto",
      _creatorId: auth.username,
      _newName: area,
      _url: `${window.location.origin}/${workspace.id}`,
      area_title: area,
    };
    professionalAreaAction(payload).then((res) => {
      getProfessionalAreas();
    });
  };

  const deleteProfArea = (data)  => {
    const payload = {
        _action: "delete",
        _creatorId: auth.username,
        _url: `${window.location.origin}/${workspace.id}`,
        professional_areaId: data.id,
      };
      professionalAreaAction(payload).then((res) => {
        getProfessionalAreas();
      });
  }

  useEffect(() => {
    getProfessionalAreas();
  }, []);
  return (
    <div className="">
      <div className="">
        <button className="btn bg-gray-200 p-4 rounded" onClick={createNewArea}>
          Add New Professional Area
        </button>
      </div>
      <div className="my-10">
        {open ? (
          <>
            <span
              data-aos="fade-down"
              data-aos-duration="1000"
              className="p-float-label"
            >
              <InputText
                id="username"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <label htmlFor="username">Edit Professional Area</label>
            </span>
            <button
              className=" p-3 bg-gray-600 text-white rounded my-4 text-sm px-10"
              onClick={renameProfArea}
            >
              Save
            </button>
          </>
        ) : newArea ? (
          <>
            <span
              data-aos="fade-down"
              data-aos-duration="1000"
              className="p-float-label"
            >
              <InputText
                id="username"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <label htmlFor="username">Create New Professional Area</label>
            </span>
            <button
              className=" p-3 bg-gray-600 text-white rounded my-4 text-sm px-10"
              onClick={createProfArea}
            >
              Create New
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        {profArea &&
          profArea.map((area, i) => (
            <>
              <div
                key={i}
                className="flex items-center relative text-sm gap-4 p-8 shadow-lg rounded w-fit"
              >
                <i className="pi pi-trash absolute !text-xs p-1 w-6 h-6 flex rounded-full text-red-600 cursor-pointer right-0 top-0" onClick={()=> deleteProfArea(area)}></i>
                <div className="card">{area?.area_title}</div>

                <i className="pi pi-pencil cursor-pointer p-2  !text-xs" onClick={() => openEdit(area)}></i>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
