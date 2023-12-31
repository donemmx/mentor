import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import line from "../../assets/bg/lines.svg";
import { createWorkspaceUser, login } from "../../utils/api";
import { userOnboard3 } from "../../utils/Validation";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import UserHeader from "./UserHeader";
import { toast } from "react-toastify";
import { authState } from "../../atom/authAtom";

export default function UserOnboardThree() {
  const params = useParams();
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const [auth, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();
  const genders = ["male", "female", "others"];
  const yearsOfExperiences = [
    "Less than 2 years",
    "2-4 years",
    "5-8 years",
    "More than 8 years",
  ];
  const onSubmit = async (values) => {
    const { user, ...others } = reg;
    let newPayload
    if(reg.user.role === "mentor"){
      newPayload = {
       _password: reg.user.confirmPassword,
       _phone: reg.user.phone,
       _postalcode: reg.user.postalcode,
       _provinceId: reg.user.province,
       _role_input:  true,
       _url: window.location.href,
       _city: values.city,
       _yearsofprofessionalinterest: values.yearsOfExperience.split(' ').join(''),
       firstame: reg.user.firstName,
       gender: values.gender,
       lastName: reg.user.lastName,
       mentor__profAreaIds: reg.user.professionalArea,
       mail: reg.user.email,
       _linkedin: 'https://www.linkedin.com/in/',
       workspaceId: params.id,
       // acceptanceCriteria : reg.form,
     }
    }
     else{
      newPayload = {
        _password: reg.user.confirmPassword,
        _phone: reg.user.phone,
        _postalcode: reg.user.postalcode,
        _provinceId: reg.user.province,
        _role_input:  false,
        _url: window.location.href,
        _city: values.city,
        _yearsofprofessionalinterest: values.yearsOfExperience.split(' ').join(''),
        firstame: reg.user.firstName,
        gender: values.gender,
        lastName: reg.user.lastName,
        mentee__profAreaIds: reg.user.professionalArea,
        mail: reg.user.email,
        _linkedin: 'https://www.linkedin.com/in/',
        workspaceId: params.id,
        // acceptanceCriteria : reg.form,
     }
    }

    createWorkspaceUser(newPayload).then((res) => {
      toast.success("successful");
      const { email, password } = reg?.user;
      login(email, password).then((res) => {
        const payload = {
          workspaceId: params.id,
          res,
        };
        setAuth(payload);
        navigate(`/${reg.user.role}-signin/${params.id}`);
      });
    });
  };

  const initialValues = {
    yearsOfExperience: "",
    city: "",
    gender: "",
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
    validationSchema: userOnboard3,
    onSubmit,
  });

  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <UserHeader />
        <div className=" flex">
          <form onSubmit={handleSubmit} className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="  line h-1 w-10 bg-gray-500"></div>
                <div className="line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-white"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
              </div>
              <div className="steps" data-aos="fade">
                <div className="font-light">{reg?.user?.role} Onboarding</div>
                <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                  Step 3
                </div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className="w-[70%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
                Enter Gender and other details
              </h3>
              <div className="space-y-2 pt-8 w-[60%]">
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <Dropdown
                    id="username"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={genders}
                    className=" !text-black"
                    filter
                  />
                  <label htmlFor="username">Gender</label>
                </span>
                {errors.gender && touched.gender && (
                  <p className="error">{errors.gender}</p>
                )}

                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText
                    id="username"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">City</label>
                </span>
                {errors.city && touched.city && (
                  <p className="error">{errors.city}</p>
                )}

                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <Dropdown
                    id="username"
                    name="yearsOfExperience"
                    value={values.yearsOfExperience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={yearsOfExperiences}
                    className=" !text-black"
                    filter
                  />
                  <label htmlFor="username">Years of Experience</label>
                </span>
                {errors.yearsOfExperience && touched.yearsOfExperience && (
                  <p className="error">{errors.yearsOfExperience}</p>
                )}
                <button
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
            <button className=" absolute right-20 top-[50%] translate-y-[-50%] arrow">
              <i className="pi pi-angle-right cursor-pointer !text-[60px] p-2"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
