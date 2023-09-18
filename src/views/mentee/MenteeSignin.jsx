import { useFormik } from "formik";
import { loginuser } from "../../utils/Validation";
import Logo from "../../component/logo/Logo";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MenteeSignin() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values);
    navigate("/mentee-dashboard");
    toast.success('Signin Successful')
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
               Hello Mentee 👋, <br/> Welcome back
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
                <Link to='/mentee-signup' className=" cursor-pointer font-bold text-blue-700" >
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
