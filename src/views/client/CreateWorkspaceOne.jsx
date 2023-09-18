import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import ClientHeader from "./ClientHeader";
import line from "../../assets/bg/lines.svg";
import { Dropdown } from "primereact/dropdown";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { useFormik } from "formik";
import { workspace1 } from "../../utils/Validation";
import { createWorkspaceWithPayment } from "../../utils/api";
import { toast } from "react-toastify";

export default function CreateWorkspaceOne() {
  const navigate = useNavigate();
  const matches = ["One to One", "One to Many"];

  const [reg, setReg] = useRecoilState(registerUserAtom);

  const onSubmit = async (values) => {
    if (values.workspace) {
      const userPayload = {
        name: values.workspace,
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
      createWorkspaceWithPayment(userPayload).then((res) => {
        toast.success('successful');
        const payload = {
          ...reg,
          workspace: {
            ...values,
            id: res.result[0].workspaceId,
            userId: res.result[0].id,
          },
        };
        setReg(payload);
        navigate("/create-workspace-2");
      });
    }
  };

  const initialValues = {
    workspace: "",
    interaction: "",
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
                  <Dropdown
                    id="username"
                    name="interaction"
                    value={values.interaction}
                    options={matches}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Interaction</label>
                </span>

                {errors.interaction && touched.interaction && (
                  <p className="error">{errors.interaction}</p>
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
