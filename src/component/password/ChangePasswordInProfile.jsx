import { useFormik } from "formik";
import { forgotPassword, loginuser, reforgotPassword } from "../../utils/Validation";
import Logo from "../../component/logo/Logo";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {resetPwdFromProfile } from "../../utils/api";
import { useRecoilState } from "recoil";
import { authState } from "../../atom/authAtom";
import React from 'react'
import { user } from "../../atom/userAtom";

export default function ChangePasswordInProfile() {
    const [userData, setUserData] = useRecoilState(user);

  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

// 
// requesting recover password
// /anonym/request-change-password

  const onSubmit = async (values) => {
    const { user_id, old_password, new_password, repeat_new_password } = values;
    const payload = {
        password : values.new_password,
        repeat_password : values.repeat_new_password,
        secret : values.old_password,
        user_id : userData.id,
      };
      resetPwdFromProfile(payload).then((res) => {
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
        old_password: "",
        new_password: "",
        repeat_new_password: "",
    },
    validationSchema: reforgotPassword,
    onSubmit,
  });


  return (
    <div>
        
        <form onSubmit={handleSubmit} className="space-y-2  pt-10">
                
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="old_password"
                    feedback={false}
                    value={values.old_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">Old password</label>
                </span>
                {errors.old_password && touched.old_password && (
                  <p className="error">{errors.old_password}</p>
                )}
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="new_password"
                    feedback={false}
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">New password</label>
                </span>
                {errors.new_password && touched.new_password && (
                  <p className="error">{errors.new_password}</p>
                )}
                <span className="p-float-label">
                  <Password
                    id="username"
                    name="repeat_new_password"
                    feedback={false}
                    value={values.repeat_new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    toggleMask
                  />
                  <label htmlFor="username">Repeat password</label>
                </span>
                {errors.repeat_new_password && touched.repeat_new_password && (
                  <p className="error">{errors.repeat_new_password}</p>
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
    </div>
  )
}
