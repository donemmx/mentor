import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import { useState } from "react";
import { userDynamicForm, workspace1 } from "../../utils/Validation";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";
import { getUserGenericForm, workspaceGenericForm } from "../../utils/api";
import { Dialog } from "primereact/dialog";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useRecoilState } from "recoil";
import { workspaceStore } from "../../atom/workspaceAtom";
import { toast } from "react-toastify";
import { user } from "../../atom/userAtom";
import { authState } from "../../atom/authAtom";
import { DataTable } from "primereact/datatable";
import Column from "antd/es/table/Column";

export default function ClientDynamicForm() {
  const [formProperties, setFormProperties] = useState([]);
  const [select, setsSelect] = useState([]);
  const [visible, setVisible] = useState(false);
  const [createdForm, setCreatedForm] = useState({});
//   const workspace = useRecoilState()
  const workspaceData = useRecoilState(workspaceStore);
  const userData = useRecoilState(user);
  const auth = useRecoilState(authState);

  const onSubmit = async (values) => {
    const property = {
      label: values.label,
      options: values.options,
      acceptedValue: values.acceptedValue
    };

    setFormProperties([...formProperties, property]);
    addForm();
    resetForm();
  };
  const submitForm = () => {
    let acceptedValueList = []
    for (let value = 0; value<formProperties.length; value++) {
        acceptedValueList.push(formProperties[value].acceptedValue,)
    }
    const filteredData = formProperties.map((data)=> {
    const {acceptedValue, ...others} = data
    return others
    })

    const payload = {
        sessionID: auth?.sessionID,
        id: workspaceData[0]?.id,
        acceptance_criteria: acceptedValueList,
        generic_forms: JSON.stringify(filteredData),
    };

    workspaceGenericForm(payload).then((res)=>{
        toast.success('Form created successfully')
    })
  };

  const addForm = () => {
    setVisible(!visible);
  };

  const loadedValues = {
    label: "",
    options: [],
    acceptedValue: "",
  };

  const removeData = (data) => {
    const newData = formProperties.splice(data);
    setFormProperties(newData);
  };

  const {
    values,
    errors,
    isValid,
    isSubmitting,
    resetForm,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: loadedValues,
    validationSchema: userDynamicForm,
    onSubmit,
  });

  useEffect(()=>{
    const payload = {
      id : workspaceData[0].id
    }
    getUserGenericForm(payload).then((res)=>{
      setCreatedForm(JSON.parse(res.payload[0]['generic_forms']))
    })
  }, [])
  if (createdForm[0]){
    console.log(createdForm[0], 'insdide if')
    for(let i = 0; i<createdForm[0]["options"].length; i++){
    console.log(createdForm[0]['options'][i], 'inside loop')
    }
  }
  return (
    <div className="rounded-lg h-[700px] w-full">
      <div className="">
        <h2 className="font-blac text-xl">Created Form</h2>
        <div className="table">
          { createdForm[0] ? (
          <table className="my-3">
            <thead>
              <td className="font-black text-xl my-1">{createdForm[0]["label"]}</td>
            </thead>
            <tbody>
              {createdForm[0]["options"].map((option, i) => (
                <tr>
                  <td>{i+1}</td>
                  <td key={i}>{option}</td>
                </tr>
              ) )}
            </tbody>

          </table>
          ) : " "}
        </div>
      </div>
      <div className="">
        {/* fixed */}
        {formProperties ? (
          <div className="">
            <div
              //   onSubmit={addForm}
              className="space-y-2 pt-8 w-[60%]"
            >
              {formProperties.map((form, i) => (
                <div
                  className="flex items-center justify-between gap-4"
                  key={i}
                >
                  <Accordion className="!w-full !p-1 !text-sm !outline-none !shadow-none">
                    <AccordionTab header={`Question ${i + 1} - ${form.label}`}>
                      <div className="">
                        <div className="font-black">Options</div>
                        {form.options.map((options, i) => (
                          <div className="flex gap-2">
                            <p className="">{i + 1}.</p>
                            <li key={i} className=" list-none">
                              {" "}
                              {options}
                            </li>
                          </div>
                        ))}
                        <p className=" py-2">
                        <span className="font-black">   Accepted Value: </span> {form.acceptedValue} 
                        </p>
                      </div>
                    </AccordionTab>
                  </Accordion>
                  <div className="">
                    <i
                      className="pi pi-trash"
                      onClick={() => removeData(i)}
                    ></i>
                  </div>
                </div>
              ))}
              {createdForm & createdForm[0] ? (
                <DataTable
                  value={createdForm[0]['options']}
                  tableStyle={{ minWidth: "50rem" }}
                  className="!text-sm"
                >
                  <Column
                    className=" text-sm"
                    field="label"
                    header="First Name"
                  ></Column>
                 </DataTable>
              ) : '' }


              <div className=" flex items-center gap-4">
                <button
                  onClick={addForm}
                  className="primary__btn flex items-center gap-4"
                >
                  {createdForm[0] && createdForm[0]['label'] ? (<> <i className="pi pi-file-edit"></i> Edit Form </>) : (<><i className="pi pi-plus"></i> Add Form</> ) }
                </button>
                {formProperties.length > 0 ? (
                  <button
                    onClick={submitForm}
                    className="primary__btn flex items-center gap-4"
                  >
                    <i className="pi pi-send"></i> Submit
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="">
          <Dialog
            header="Acceptance Form"
            visible={visible}
            onHide={() => setVisible(false)}
            className="w-[90%] lg:w-[35vw]"
          >
            <div className="user  flex flex-col justify-center items-center w-[100%] mx-auto mt-[5vh]">
              <h4 className=" font-bold pt-3">Mentor Acceptance Form </h4>
              <p className="text-sm text-center text-[#666666]">
                create a form
              </p>
            </div>
            <div className="w-[80%] mx-auto py-5">
              <form onSubmit={handleSubmit} className="my-1">
                <div className="space-y-2 flex flex-col gap-2 pt-8 w-[100%]">
                  <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="p-float-label"
                  >
                    <InputText
                      id="username"
                      name="label"
                      onChange={handleChange}
                      value={values.label}
                    />
                    <label htmlFor="username">Enter Field Label</label>
                  </span>

                  {errors.label && touched.label && (
                    <p className="error">{errors.label}</p>
                  )}
                  <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="my-2 p-float-label"
                  >
                    <Chips
                      name="options"
                      value={values.options}
                      onChange={handleChange}
                      separator=","
                    />

                    <label htmlFor="username">
                      Enter options separated by comma (,)
                    </label>
                  </span>

                  {errors.options && touched.options && (
                    <p className="error">{errors.options}</p>
                  )}
                  <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="my-2 p-float-label"
                  >
                    <Dropdown
                      name="acceptedValue"
                      options={values.options}
                      value={values.acceptedValue}
                      onChange={handleChange}
                    />
                    <label htmlFor="username">
                      Accepted Value
                    </label>
                  </span>

                  <button className="primary__btn flex items-center gap-4" disabled={!isValid || isSubmitting}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
