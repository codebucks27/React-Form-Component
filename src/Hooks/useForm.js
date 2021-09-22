import { useState, useEffect } from 'react'
import { omit } from "lodash";
const useForm = (callback) => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            //callback()
            setIsSubmitting(true)
        }
    }, [errors])




    const validate = (event, name, val) => {

        switch (name) {
            case 'username':
                if (
                    val.length <= 4) {

                    setErrors({ ...errors, username: 'Username atleast have 5 letters' });

                } else {


                    let newObj = omit(errors, "username");
                    setErrors(newObj);
                }
                break
            case 'email':
                if (
                    !new RegExp(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ).test(val)
                ) {


                    setErrors({ ...errors, email: 'Enter a valid e-mail address' });


                } else {


                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
                break
            case 'password':
                if (
                    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(val)
                ) {
                    //set error for password 1 uppercase 8 lettters and 1 number atleast

                    setErrors({ ...errors, password: 'Enter a secure password: At least 8 characters long, containing uppercase and lowercase letters and numbers.' });

                } else {

                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                }
                break

            default:
                break
        }


    }


    const handleSubmit = event => {
        if (event) event.preventDefault()

        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
            // setValues({});
        }
    }


    const handleChange = event => {
        event.persist()
        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);

        setValues(values => ({
            ...values,
            [name]: val,
        }));
    }

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        setValues,
    }
}

export default useForm