import * as yup from "yup";

//validation object
export const FORM_VALIDATION = {
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("This Field is Required"),
  first_name: yup
    .string()
    .required("This is Required")
    .matches(
      "^(?=.{2,40}$)[a-zA-Z]+(?:[-'s][a-zA-Z]+)*$",
      "Must contain only alphabets and length > 2 and < 40"
    ),
  last_name: yup
    .string()
    .required("This is Required")
    .matches(
      "^(?=.{2,40}$)[a-zA-Z]+(?:[-'s][a-zA-Z]+)*$",
      "Must contain only alphabets and length > 2 and < 40"
    ),
  username: yup
    .string()
    .matches(
      "^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$",
      "Username must be 5-20 characters long and not includes  __ or _. or ._ or .."
    ),

  password: yup
    .string()
    .required("This Field is Required")
    .min(4, "Can't be less than 4 characters")
    .max(16, "Can't be greater than 16 characters"),
  password1: yup
    .string()
    .required("This Field is Required")
    .min(4, "Can't be less than 4 characters")
    .max(16, "Can't be greater than 16 characters"),
  password2: yup
    .string()
    .required("This Field is Required")
    .min(4, "Can't be less than 4 characters")
    .max(16, "Can't be greater than 16 characters"),
  purpose: yup.string().required("This Field is Required").min(2).max(100),
  numberOfCredits: yup
    .number("Must be a number")
    .required("This Field is Required")
    .min(1, "Should be greater than or equal to 1")
    .max(50000),
  totalPrice: yup
    .number()
    .required("This Field is Required")
    .moreThan(0, "Should be greater than 0$"),
  selectedService: yup.string().required("Please Select a Service"),
};

//formik initial values
export const FORMIK_INITIAL_VALUES = {
  email: "",
  password: "",
};
