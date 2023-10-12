import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import ClientHeader from "./ClientHeader";
import line from "../../assets/bg/lines.svg";
import { Dropdown } from "primereact/dropdown";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { useFormik } from "formik";
import { workspace1 } from "../../utils/Validation";
import { useEffect, useState } from "react";
import { Chips } from "primereact/chips";

export default function CreateWorkspaceOne() {
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([]);

  const [reg, setReg] = useRecoilState(registerUserAtom);

  const onSubmit = async (values) => {
    if (values.workspace) {
        const payload = {
          ...reg,
          workspace: {
            maxMentees : values.maxMentees,
            maxMentors : values.maxMentors,
            professionalArea : values.professionalArea,
            workspace : values.workspace,
          },
        };
        setReg(payload);
        navigate("/create-workspace-2");
    }};

  const initialValues = {
    workspace: "",
    professionalArea: '',
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
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <form onSubmit={handleSubmit} className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className=" line h-1 w-10 bg-white"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
              </div>
              <div className="steps">
                <div className="font-light">Create workspace</div>
                <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                  Step 1
                </div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className="w-[100%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
                Hurray 😀! <br />
                Workspace Configuration
              </h3>
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

                <button
                  onClick={onSubmit}
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                  disabled={!isValid || isSubmitting}
                >
                  Proceed
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 z-0  h-[70vh]">
              <img className=" h-full w-full object-cover" src={line} alt="" />
            </div>
            <Link
              to="/onboard-4"
              className=" absolute right-20 top-[50%] translate-y-[-50%] arrow"
            >
              <i className="pi pi-angle-right cursor-pointer !text-[60px] p-2"></i>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
