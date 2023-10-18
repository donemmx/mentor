import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import ClientHeader from "./ClientHeader";
import line from "../../assets/bg/lines.svg";
import { getProvinces } from "../../utils/api";
import { stage2 } from "../../utils/Validation";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { toast } from "react-toastify";

export default function OnboardTwo() {
  const [province, setProvince] = useState([]);
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { user, ...others } = reg;
    const payload = {
      ...others,
      user: {
        ...values,
        ...user,
      },
    };

    setReg(payload);
    navigate("/onboard-4");
  };

  useEffect(() => {
    getProvinces()
      .then((res) => {
        setProvince(res.payload);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  }, []);

  const initialValues = {
    province: "",
    phone: "",
    postalcode: "",
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
    validationSchema: stage2,
    onSubmit,
  });

  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <ClientHeader />
        <div className=" flex">
          <div className="">
            <div className=" mx-auto">
              <div className="absolute top-[15%] flex gap-3">
                <div className="  line h-1 w-10 bg-gray-500"></div>
                <div className="line h-1 w-10 bg-gray-500"></div>
                <div className=" line h-1 w-10 bg-white"></div>
                <div className=" line h-1 w-10 bg-gray-500"></div>
              </div>
              <div className="steps" data-aos="fade">
                <div className="font-light">User Onboarding</div>
                <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                  Step 3
                </div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className="w-[70%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
                Enter Province and other details
              </h3>
              <form onSubmit={handleSubmit} className="space-y-2 pt-8 w-[60%]">
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <Dropdown
                    id="username"
                    name="province"
                    value={values.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={province}
                    optionLabel="Province"
                    optionValue="Province"
                    className=" !text-black"
                    filter
                  />
                  <label htmlFor="username">Province</label>
                </span>
                {errors.province && touched.province && (
                  <p className="error">{errors.province}</p>
                )}
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText
                    id="username"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Phone Number</label>
                </span>
                {errors.phone && touched.phone && (
                  <p className="error">{errors.phone}</p>
                )}
                <span
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="p-float-label"
                >
                  <InputText
                    id="username"
                    name="postalcode"
                    value={values.postalcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Postal Code</label>
                </span>
                {errors.postalcode && touched.postalcode && (
                  <p className="error">{errors.postalcode}</p>
                )}

                <button
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
                  disabled={!isValid || isSubmitting}
                >
                  Proceed
                </button>
              </form>
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
        </div>
      </div>
    </div>
  );
}
