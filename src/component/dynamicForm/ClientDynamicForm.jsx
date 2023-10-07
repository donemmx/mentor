import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useState } from "react";
import { userDynamicForm, workspace1 } from "../../utils/Validation";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";
import { workspace_genericForm } from "../../utils/api";
import { Dialog } from "primereact/dialog";
import { Accordion, AccordionTab } from "primereact/accordion";

export default function ClientDynamicForm() {
  const [formProperties, setFormProperties] = useState([]);
  const [select, setsSelect] = useState([]);
  const [visible, setVisible] = useState(false);

  const onSubmit = async (values) => {
    const property = {
      label: values.label,
      options: values.options,
    };

    setFormProperties([...formProperties, property]);
    addForm();
    resetForm();
  };
  const submitForm = () => {
    const payload = {
      generic_forms: [...formProperties],
    };
    console.log(formProperties);
  };

  const addForm = () => {
    setVisible(!visible);
  };

  const loadedValues = {
    label: "",
    options: [],
    acceptedValue: ''
  };

  const removeData = (data) => {
    const newData = formProperties.splice(data);
    setFormProperties(newData);
  };

  const {
    values,
    errors,
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

  return (
    <div className="rounded-lg h-[700px] w-full">
      <h2 className="font-black text-xl">Create Form</h2>
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
                  <Accordion className="!w-full !p-1 !text-sm">
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
                        <p className="font-black py-2">Accepted Value: {form.acceptance}</p>
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

              <div className=" flex items-center gap-4">
                <button
                  onClick={addForm}
                  className="primary__btn flex items-center gap-4"
                >
                  <i className="pi pi-plus"></i> Add Form
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
                <div className="space-y-2 pt-8 w-[100%]">
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
                  <button className="primary__btn flex items-center gap-4">
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
