import * as yup from 'yup'

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

const registerUser = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5).max(25).matches(passwordRule, {message: "Please create a stronger password"}).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Required")
})
const loginuser = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required"),
})

const stage1 = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
})

const stage2 = yup.object().shape({
    province: yup.string().required("Required"),
    postalcode: yup.string().required("Required"),
    phone: yup.string().required("Required"),
})


const workspace1 = yup.object().shape({
    workspace: yup.string().required("Required"),
    maxMentors: yup.number().required("Required"),
    maxMentees: yup.number().required("Required"),
})


export {
    registerUser,
    loginuser,
    stage1,
    stage2,
    workspace1,
}