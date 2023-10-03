import { useFormik } from "formik";
import { forgotPassword, loginuser } from "../../utils/Validation";
import Logo from "../../component/logo/Logo";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../utils/api";
import { useRecoilState } from "recoil";
import { authState } from "../../atom/authAtom";

export default function ClientForgotPassword() {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

// 
// requesting recover password
// /anonym/request-change-password

  const onSubmit = async (values) => {
    const { email, password, repeat_password, secret } = values;
    const payload = {
        password : values.password,
        repeat_password : values.repeat_password,
        secret : values.secret,
        user_id : values.email,
      };
    resetPassword(payload).then((res) => {
        res = res.result[0];
        if (res.is_success === false || res.result_title === "Secrets don't match"){
          toast.error("Incorrect token !!!")
        } else if (res.is_success === true && res.result_title == "New password is set"){
          toast.success("New password set successfully");
          navigate("/signin");

        }
      })
      .catch((e) => {
        if (!e.response) {
          toast.error("please check ");

          //check you API endpoint, you must enable CORS header in settings
        }
        if (e.response && e.response.status === 403) {
          toast.error("please check ");
          //todo: api endpoint required authorisation
        }
      });
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
      repeat_password: "",
    },
    validationSchema: forgotPassword,
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
                Reset Your Password
              </h3>
              <p className="pt-2">We understand it gets clumsy sometimes. </p>
              <form onSubmit={handleSubmit} className="space-y-2  pt-10">
                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Enter your email</label>
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
                    toggleMask
                  />
                  <label htmlFor="username">New password</label>
                </span>
                {errors.password && touched.password && (
                  <p className="error">{errors.password}</p>
                )}
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="repeat_password"
                    feedback={false}
                    value={values.repeat_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">Repeat password</label>
                </span>
                {errors.repeat_password && touched.repeat_password && (
                  <p className="error">{errors.repeat_password}</p>
                )}
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="secret"
                    feedback={false}
                    value={values.secret}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">Token</label>
                </span>
                {errors.secret && touched.secret && (
                  <p className="error">{errors.secret}</p>
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
        <div className="bgSignup hidden  md:flex justify-center items-center w-full "></div>
      </div>
    </div>
  );
}
