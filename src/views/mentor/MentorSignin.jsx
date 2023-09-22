import { useFormik } from "formik";
import { loginuser } from "../../utils/Validation";
import Logo from "../../component/logo/Logo";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../utils/api";
import { useRecoilState } from "recoil";
import { authState } from "../../atom/authAtom";

export default function MentorSignin() {
  const navigate = useNavigate();
  const params = useParams()
  const [auth, setAuth] = useRecoilState(authState);

  const onSubmit = async (values) => {
    const { email, password } = values;
    login(email, password)
      .then((res) => {
          setAuth(res);
          navigate("/mentor-dashboard");
          toast.success("Signin Successful");
        }
      ).catch((err)=> console.log(err))
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
    validationSchema: loginuser,
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
               Hello Mentor 👋, <br/> Welcome back
              </h3>
              <p className="pt-2">Fill in details to continue. </p>
              <form onSubmit={handleSubmit} className="space-y-2  pt-10">
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
                    feedback={false}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Password</label>
                </span>
                {errors.password && touched.password && (
                  <p className="error">{errors.password}</p>
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
                  Login
                </button>
              </form>
              <p className=" pt-5 text-sm">
                Don`t have an account?{" "}
                <Link to={`/mentor-signup/${params.id}`} className=" cursor-pointer font-bold text-blue-700" >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black hidden  md:flex justify-center items-center w-full ">
        </div>
      </div>
    </div>
  );
}
