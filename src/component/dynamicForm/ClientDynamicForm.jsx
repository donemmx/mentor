import { ColorPicker } from "primereact/colorpicker";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { workspaceStore } from "../../atom/workspaceAtom";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import {
  editRequestWorkspaceUser,
  getWorkspace,
  ownerWorkspaceEdit,
} from "../../utils/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { workspace1 } from "../../utils/Validation";
import { Dropdown } from "primereact/dropdown";
import { user } from "../../atom/userAtom";
import { authState } from "../../atom/authAtom";
import { useNavigate } from "react-router-dom";

export default function ClientDynamicForm() {
    const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
    const userData = useRecoilValue(user);
    const [numbers, setNumbers] = useState([]);
    const navigate = useNavigate();

    //   For user forms
    const [ formList, setFormList ] = useState([])
    const [ formProperties, setFormProperties ] = useState([
        { label: '', options: '',},
    ])
    const [ formFields, setFormFields ] = useState({
        label: '',
        options: []
    })

    console.log(formFields, 'The form fields')
    console.log(formProperties, 'The form Propertyies fields')
    const handleFormChange = (e) => {
        console.log(e.target.value, e.target.name, 'the results')

        if (e.target.name === 'options') {
            var resultArray = e.target.value
            var arrayValue = resultArray.split(',').map(item => item.trim()).filter(item => item !== '');
            let value = formFields
            value[e.target.name] = arrayValue
            setFormFields({value})
        } else {
            let value = formFields;
            value[e.target.name] = e.target.value
            setFormFields({value})
        }
    }

    const chFields = (values) => {
        const property = {
            label : values.label,
            option : values.options
        }

    }
    
    const createField = () => {
        let value = []
    }

    const handleFieldChange = (e) => {
        let x;
        console.log(e.target.value, e.target.name)
        // let value = [...formProperties];
        // value[index][e.target.name] = e.target.value
        // setFormProperties([value])
    }
    const addField = (e) => {
        e.preventDefault()
        const property = {
            label : '',
            option : ''
        }
        setFormFields([...formProperties, property])
    }


    // var text = "Area of Specilization, Province, Years of Professional Experience,";

    // 
    // console.log(resultArray);

    console.log('hello world')
    
  const loadedValues = {
    workspace: "",
    maxMentors: "",
    maxMentees: "",
  };
        
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        validateOnMount: true,
        initialValues: loadedValues,
        validationSchema: workspace1,
        // onSubmit,
    });

    return (
        <div className="rounded-lg h-[700px] w-full">
        <h2 className="font-black text-xl">Create Form</h2>
        <div className="">
            <form>
                <div>
                    <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="p-float-label"
                    >
                        
                    <InputText
                        id="username"
                        name="label"
                        onChange={event => handleFormChange(event)}
                        value={formFields.label}
                        // value={values.workspace}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                    />
                    <label htmlFor="username">Enter Field Label</label>
                    </span>
                    <span
                        data-aos="fade-down"
                        data-aos-duration="1000"
                        className="my-2 p-float-label"
                        >
                        <InputText
                            id="username"
                            name="options"
                            onChange={event => handleFormChange(event)}
                            value={formFields.options}
                            // value={values.workspace}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                        />
                        <label htmlFor="username">Enter options separated by comma (,)</label>
                    </span>
                    
                    <button
                        onClick={createField}
                            className="primary__btn flex items-center gap-4"
                        //   disabled={!newColor || !fileDataURL || loading}
                        >
                            {/* //{loading ? <i className="pi pi-spin pi-spinner"></i> : ""} */}
                            Create field..
                    </button>
                    {/* <button
                        onClick={addField}
                            className="my-2 primary__btn flex items-center gap-4"
                        //   disabled={!newColor || !fileDataURL || loading}
                        >
                        {/* //   {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
                            Add more fields
                    </button> */}
                </div>
            </form>
                  

            {/* fixed */}
            {/* <div className="">
                <div 
                onSubmit={handleFormChange} 
                className="space-y-2 pt-8 w-[60%]">
                    {formFields.map((form, index) =>{

                        return (
                            <div key={index}>
                                <span
                                data-aos="fade-down"
                                data-aos-duration="1000"
                                className="p-float-label"
                                >
                                <InputText
                                    id="username"
                                    name="label"
                                    onChange={event => handleFormChange(event, index)}
                                    value={form.label}
                                    // value={values.workspace}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                />
                                <label htmlFor="username">Label</label>
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
                                    name="options"
                                    // value={values.workspace}
                                    onChange={event => handleFormChange(event, index)}
                                    value={form.options}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                />
                                <label htmlFor="username">options</label>
                                </span>
                
                                {errors.workspace && touched.workspace && (
                                <p className="error">{errors.workspace}</p>
                                )}
                            </div>
                        )
                    }
                    )
                    }
                
                <button
                    // onClick={onSubmit}
                    className="primary__btn flex items-center gap-4"
                    //   disabled={!newColor || !fileDataURL || loading}
                    >
                    {/* //{loading ? <i className="pi pi-spin pi-spinner"></i> : ""} 
                    Proceed
                    </button>
                    <button
                    onClick={addField}
                    className="primary__btn flex items-center gap-4"
                    //   disabled={!newColor || !fileDataURL || loading}
                    >
                    {/* //{loading ? <i className="pi pi-spin pi-spinner"></i> : ""} 
                    Add more fields
                    </button>
                </div>
            </div> */}
        </div>
        </div>
    );
}
