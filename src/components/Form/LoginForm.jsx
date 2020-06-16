import React from 'react';
import { useFormik } from 'formik';

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
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label htmlFor="email">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                onChange={formik.handleChange}
                value={formik.values.rememberMe}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SignupForm