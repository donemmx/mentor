import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useRecoilState } from "recoil";
import { addWorkSpaceStore } from "../../atom/addWorkspace";
import { workspace1 } from "../../utils/Validation";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";

export default function PricingFormTwo() {
  const [numbers, setNumbers] = useState([]);
  const [addWorkspace, setAddworkspace] = useRecoilState(addWorkSpaceStore);

  const onSubmit = async (values) => {
    if (values.workspace) {
      const payload = {
        ...addWorkspace,
        workspace: {
          ...values,
        },
        step: 2,
      };
      setAddworkspace(payload);
    }
  };

  const initialValues = {
    workspace: "",
    maxMentors: "",
    maxMentees: "",
    professionalArea: ''
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
    initialValues: initialValues,
    validationSchema: workspace1,
    onSubmit,
  });

  useEffect(() => {
    var my_array = [];
    for (let i = 1; i <= 100; i++) {
      my_array.push(i);
    }
    setNumbers(my_array);
  }, []);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="space-y-2 pt-8 w-full">
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
                  <label htmlFor="username">Workspace Name</label>
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
                     <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText
                    id="username"
                    name="professionalArea"
                    value={values.professionalArea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Professional Area</label>
                </span>

                {errors.professionalArea && touched.professionalArea && (
                  <p className="error">{errors.professionalArea}</p>
                )}


                <button
                  onClick={onSubmit}
                  className="primary__btn"
                  disabled={!isValid || isSubmitting}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
