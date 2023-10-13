import { useFormik } from "formik";
import { requestNewPassword } from "../../utils/Validation";
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { requestPasswordChange } from "../../utils/api";

export default function ClientRequestNewPassword() {
  const onSubmit = async (values) => {
    const email = values;
    const payload = {
        user : values.email,
      };
      requestPasswordChange(payload).then((res)=>{
        toast.info("Check your email for password reset.")
        
      })
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
    },
    validationSchema: requestNewPassword,
    onSubmit,
  });
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="grid md:grid-cols-2 h-full w-full ">
        <div className=" p-5 flex items-center justify-center">
          <div className="w-full flex flex-col justify-center">
            <Link to='/' className="absolute top-6 font-black  text-[16px]">
              <span className=" bg-black text-white px-3 py-2 rounded mr-2">
                M
              </span>
              Mentor Systems
            </Link>

            <div className="w-[95%] md:w-[90%] lg:w-[60%] mx-auto">
              <h3 className=" font-black text-[20px] lg:text-[30px] leading-[1.1]">
                Forgot Your Password?
              </h3>
              <p className="pt-2">Enter your email to recover password. </p>
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
                <button
                  className="primary__btn mt-5"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                  ) : (
                    ""
                  )}
                  Proceed
                </button>
              </form>
              <div className="flex flex-wrap justify-between">

                <p className=" pt-5 text-sm">
                  {/* Don`t have an account?{" "} */}
                  <Link
                    to="/signin"
                    className=" cursor-pointer font-bold text-blue-700"
                  >
                    Sign in
                  </Link>
                </p>
                <p className=" pt-5 text-sm">
                  Don`t have an account?{" "}
                  <Link
                    to="/register"
                    className=" cursor-pointer font-bold text-blue-700"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bgSignin hidden  md:flex justify-center items-center w-full "></div>
      </div>
    </div>
  );
}
