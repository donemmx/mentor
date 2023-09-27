import React, { useEffect, useState } from 'react'
import { createWorkspaceWithPayment, getPricing, login } from '../../utils/api'
import WorkspacePricingCard from '../pricingCard/WorkspacePricingCard'
import { InputText } from 'primereact/inputtext';
import { ColorPicker, Dropdown } from 'antd';
import { useRecoilState } from 'recoil';
import { registerUserAtom } from '../../atom/registrationAtom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { authState } from '../../atom/authAtom';
import { addWorkSpaceStore } from '../../atom/addWorkspace';
import { stage2, workspace1 } from '../../utils/Validation';

export default function PricingFormTwo() {
    
    const [tariff, setTariff] = useState([])
    const [visible, setVisible] = useState(null);
    const [file, setFile] = useState(null);
    const [fileDataURL, ] = useState(null);
    const [color, setColor] = useState();
    const [auth, setAuth] = useRecoilState(authState);
    const [match, setMatches] = useState([]);
    // const [numbers, setNumbers] = useState([]);
    const [addWorkspace, setAddworkspace] = useRecoilState(addWorkSpaceStore);
 
    const onSubmit = async (values) => {
    if (values.workspace) {
        const payload = {
            ...addWorkspace,
            workspace: {
            ...values,
            },
            step: 2,
        };
        setAddworkspace(payload);
    }};

    const initialValues = {
    workspace: "",
    maxMentors: "",
    maxMentees: "",
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
    validationSchema: workspace1,
    onSubmit,
    });
    const numbers = 1;
    // [1, 2, 3, 4, 5];

    // useEffect(() => {
    // var my_array = [];
    // for (let i = 1; i <= 100; i++) {
    //     my_array.push(i);
    // }
    // setNumbers(my_array);
    // }, []);

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} className=" flex">
                    <div className="">
                        <div className=" mx-auto">
                            <div className="space-y-2 pt-8 w-full">
                                <span
                                data-aos="fade-down"
                                data-aos-duration="1000"
                                className="p-float-label"
                                >
                                <InputText
                                    id="username"
                                    name="workspace"
                                    value={values.workspace}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <label htmlFor="username">Workspace Name</label>
                                </span>

                                {errors.workspace && touched.workspace && (
                                <p className="error">{errors.workspace}</p>
                                )}

                                <span
                                data-aos="fade-down"
                                data-aos-duration="1000"
                                className="p-float-label"
                                >
                                <InputText
                                    id="username"
                                    name="maxMentors"
                                    value={values.maxMentors}
                                    options={numbers}
                                    onChange={handleChange}
                                />
                                <label htmlFor="username">Max Mentors</label>
                                </span>

                                {errors.maxMentors && touched.maxMentors && (
                                <p className="error">{errors.maxMentors}</p>
                                )}
                                <span
                                data-aos="fade-down"
                                data-aos-duration="1000"
                                className="p-float-label"
                                >
                                <InputText
                                    id="username"
                                    name="maxMentees"
                                    value={values.maxMentees}
                                    options={numbers}
                                    onChange={handleChange}
                                />
                                <label htmlFor="username">Max Mentees</label>
                                </span>

                                {errors.maxMentees && touched.maxMentees && (
                                <p className="error">{errors.maxMentees}</p>
                                )}

                                <button
                                onClick={onSubmit}
                                data-aos="fade-down"
                                data-aos-duration="800"
                                className="primary__btn"
                                disabled={!isValid || isSubmitting}
                                >
                                Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

  )
}
