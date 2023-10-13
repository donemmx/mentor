import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { registerUser } from "../../utils/Validation";
import Logo from "../../component/logo/Logo";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";


export default function MentorSignup() {
  const [ reg, setReg ] = useRecoilState(registerUserAtom)

  const location = useNavigate()
  const params = useParams()
  const onSubmit = async (values) => {
    const payload = {
      user: {
        ...values,
        role: 'mentor'
      }
    }
    setReg(payload)
    location(`/user-onboard/${params.id}`)
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
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerUser,
    onSubmit,
  });
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="grid md:grid-cols-2 h-full w-full ">
        <div className=" p-5 flex items-center justify-center">
          <div className="w-full flex flex-col justify-center">
            <Logo />
            <div className="w-[95%] md:w-[90%] lg:w-[60%] mx-auto">
              <h3 className=" font-black text-[20px] lg:text-[30px] leading-[1.1]">
                Let`s create your mentor account
              </h3>
              <p className="pt-2">Fill in details to continue. </p>
              <form  onSubmit={handleSubmit} className="space-y-2  pt-10">
                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Email</label>
                </span>
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">Password</label>
                </span>
                {errors.password && touched.password && (
                  <p className="error">{errors.password}</p>
                )}
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="confirmPassword"
                    feedback={false}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask

                  />
                  <label htmlFor="username">Confirm Password</label>
                </span>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              <button
                className="primary__btn mt-5"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                ) : (
                  ""
                )}
                Register
              </button>
              </form>
              <p className=" pt-5 text-sm">
                Already have an account?{" "}
                <Link to={`/mentor-signin/${params.id}`} className=" cursor-pointer font-bold text-blue-700">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black hidden md:block w-full"></div>
      </div>
    </div>
  );
}
