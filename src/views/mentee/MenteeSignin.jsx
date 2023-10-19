import { useFormik } from "formik";
import { loginuser } from "../../utils/Validation";
import Logo from "../../component/logo/Logo";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { checkUserEmailByWorkspace, getUserWorkspace, login } from "../../utils/api";
import { useRecoilState } from "recoil";
import { authState } from "../../atom/authAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useEffect, useState } from "react";

export default function MenteeSignin() {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const { email, password } = values;


    const data = {
      id: params.id,
      email: values.email,
    };

    checkUserEmailByWorkspace(data)
      .then((res) => {
        setLoading(false);
        if(res.payload.length === 1){
          if (res?.payload?.userByworkSpaceStatusId === "ban") {
            toast.error("User has been banned. Please contact admin");
          } else  {
            login(email, password)
              .then((res) => {
                setAuth(res);
                setWorkspace(params.id);
                navigate(`/mentee-dashboard`);
                toast.success("Signin Successful");
              })
              .catch((err) => {
                toast.error(err.response.data.msg);
              });
          }
        }
        else{
          toast.error("User does not exist on this workspace. Please Signup");
        }
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.response.data.msg);
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
      confirmPassword: "",
    },
    validationSchema: loginuser,
    onSubmit,
  });

  useEffect(() => {
    const payload = {
      id: params.id,
    };
    getUserWorkspace(payload).then((res) => {
      setWorkspace(res.payload[0]);
    });
  }, []);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="grid md:grid-cols-2 h-full w-full ">
        <div className=" p-5 flex items-center justify-center">
          <div className="w-full flex flex-col justify-center">
            <Logo />
            <div className="w-[95%] md:w-[90%] lg:w-[60%] mx-auto">
              <h3 className=" font-black text-[20px] lg:text-[30px] leading-[1.1]">
                Hello Mentee 👋, <br /> Welcome back
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
                  disabled={!isValid || isSubmitting || loading}
                >
                  {loading ? (
                    <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                  ) : (
                    ""
                  )}
                  Login
                </button>
              </form>
              <p className=" pt-5 text-sm">
                Don`t have an account?{" "}
                <Link
                  to={`/mentee-signup/${params.id}`}
                  className=" cursor-pointer font-bold text-blue-700"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black hidden  md:flex justify-center items-center w-full "></div>
      </div>
    </div>
  );
}
