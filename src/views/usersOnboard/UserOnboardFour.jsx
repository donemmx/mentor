import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import line from "../../assets/bg/lines.svg";
import { getUserGenericForm } from "../../utils/api";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import UserHeader from "./UserHeader";

export default function UserOnboardFour() {
  const [formData, setFormData] = useState([]);
  const params = useParams();
  const [reg, setReg] = useRecoilState(registerUserAtom);
  const navigate = useNavigate();
  let newArray = new Map();

  const onSubmit = () => {
    let selectedValues = [];
    newArray.forEach((res) => {
      selectedValues.push(res);
    });
    const payload = {
      form: selectedValues,
      ...reg,
    };
    setReg(payload);
    navigate(`/user-onboard-2/${params.id}`)
    console.log(selectedValues);
  };

  const setValues = (data, i) => {
    newArray.set(i, data);
  };

  useEffect(() => {
    const payload = {
      id: params.id,
    };
    getUserGenericForm(payload).then((res) => {
      setFormData(JSON.parse(res.payload[0]?.generic_forms));
    });
  }, []);

  return (
    <div className="w-full h-[100vh] bg-[var(--primary)] text-white ">
      <div className="grid h-full w-[90%] mx-auto ">
        <UserHeader />
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
                <div className="font-light">{reg?.user?.role} Onboarding</div>
                <div className="pb-10 text-[1.2rem] font-bold text-[var(--secondary)]">
                  Step 2
                </div>
              </div>
              <h3
                data-aos="fade-down"
                data-aos-duration="1500"
                className="w-[70%] font-black text-[20px] lg:text-[40px] leading-[1.1]"
              >
                Answer questions below
              </h3>
              <div className="space-y-2 pt-8 w-[60%]" id="form">
                {formData &&
                  formData?.map((data, i) => (
                    <span
                      key={i}
                      data-aos="fade-down"
                      data-aos-duration="1000"
                      className="p-float-label"
                    >
                      <select
                        name=""
                        id=""
                        value={newArray[i]}
                        onChange={(e) => setValues(e.target.value, i)}
                        className=" w-full h-[50px] px-2 text-black rounded"
                      >
                        <>
                          <option disabled> Select an option </option>
                          {data?.options.map((res, index) => (
                            <option value={res} key={index}>
                              {res}
                            </option>
                          ))}
                        </>
                      </select>
                    </span>
                  ))}
                <button
                  onClick={onSubmit}
                  data-aos="fade-down"
                  data-aos-duration="800"
                  className="primary__btn"
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
        </div>
      </div>
    </div>
  );
}
