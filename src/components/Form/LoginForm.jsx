import React from 'react';
import {useFormik} from 'formik';
import {Button, Checkbox, Header, Image, Input, Message, Segment} from "semantic-ui-react";
import style from "./LoginForm.module.css"
import logo from "../../assets/img/logo.png"

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'No password provided';
    }

    return errors;
};


const LoginForm = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            let {email, password, rememberMe} = values;
            props.login(email, password, rememberMe)
        },
    });
    return (
        <div className={style.loginForm}>
            <div className={style.formBody} style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={logo}/> Log-in to your account
                </Header>

                <form onSubmit={formik.handleSubmit}>
                    <Segment className={style.loginSegment}>
                        <div className={style.loginFormItem}>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="E-mail address"
                            />
                            {formik.errors.email ? <Message color="red" size="mini">{formik.errors.email}</Message> : null}
                        </div>
                        <div className={style.loginFormItem}>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                            />
                            {formik.errors.password ? <Message color="red" size="mini">{formik.errors.password}</Message> : null}
                        </div>
                        <div className={style.loginFormItem}>
                            <Checkbox
                                label="Remember me"
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                onChange={formik.handleChange}
                                value={formik.values.rememberMe}
                            />
                        </div>
                        <Button type="submit" color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </form>
            </div>
        </div>
    );
};

export default LoginForm