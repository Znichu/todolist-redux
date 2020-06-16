import React from 'react';
import {useFormik} from 'formik';
import {Button, Input} from "semantic-ui-react";
import style from "./LoginForm.module.css"

const SignupForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
            rememberMe: ""
        },
        onSubmit: values => {
            let {email, password, rememberMe} = values;
            props.login(email, password, rememberMe)
        },
    });
    return (
        <div className={style.loginForm}>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                </div>
                <div className={style.loginFormItem}>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                </div>
                <div className={style.loginFormItem}>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>
                <div className={style.loginFormItem}>
                    <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        onChange={formik.handleChange}
                        value={formik.values.rememberMe}
                    />
                    <label htmlFor="password">remember me</label>
                </div>


                <Button color='blue' type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default SignupForm