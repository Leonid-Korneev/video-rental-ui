import {Form, Input} from "antd";
import {useState} from 'react';
import {UsersService} from "../../api/UsersService";
import style from './RegistrationForm.module.css'
import {Redirect} from "react-router-dom";

export const RegistrationForm = () => {

    const [form] = Form.useForm();
    const [isloginTaken, setIsLoginTaken] = useState(false);
    const [successfulRegistration, setSuccessfulRegistration] = useState(false);
    const [redirectToLoginPage, setRedirectToLoginPage] = useState(false);
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };


    const onFinish = async (values) => {
        try {
            await UsersService.createUser(values);
            setSuccessfulRegistration(true);
            setTimeout(() => {
                setRedirectToLoginPage(true);
            }, 5000)
        } catch (e) {
            console.log(e)
            if (e.response.data === 'Данный логин уже занят.') {
                setIsLoginTaken(true);
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeLogin = () => {
        setIsLoginTaken(false);
    }

    if (redirectToLoginPage) {
        return <Redirect to={"/login"}/>
    }

    if (successfulRegistration) {
        return <div>Вы успешно прошли регистрацию, вы будете перенаправлены на страницу входа в систему!</div>
    }

    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            id='registration-form'
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item
                label="Логин"
                name="username"
                rules={[{required: true, message: 'Укажите ваш логин'}]}>
                <Input className={isloginTaken ? style.loginInputError : ''} onChange={onChangeLogin}/>
            </Form.Item>

            {isloginTaken ?
                <div className={style.loginTakenError + " " + "ant-col ant-col-16"}>
                    Логин уже занят
                </div>
                : null}

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{required: true, message: 'Укажите ваш логин'}]}
                type='password'>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Фамилия"
                name="lastName"
                rules={[{required: true, message: 'Укажите вашу фамилию'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Имя"
                name="firstName"
                rules={[{required: true, message: 'Укажите ваше имя'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Отчество"
                name="middleName"
                rules={[{required: true, message: 'Укажите ваше отчество'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Серия паспорта"
                name="series"
                rules={[{required: true, message: 'Укажите серию вашего паспорта'}]}>
                <Input type='number'/>
            </Form.Item>

            <Form.Item
                label="Номер паспорта"
                name="number"
                rules={[{required: true, message: 'Укажите номер вашего паспорта'}]}>
                <Input type='number'/>
            </Form.Item>

            <Form.Item
                label="Номер телефона"
                name="phone"
                rules={[{required: true, message: 'Укажите номер вашего телефона'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Город"
                name="city"
                rules={[{required: true, message: 'Укажите ваш город'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Улица"
                name="street"
                rules={[{required: true, message: 'Укажите улицу вашего проживания'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Дом"
                name="house"
                rules={[{required: true, message: 'Укажите номер вашего дома'}]}>
                <Input/>
            </Form.Item>

        </Form>
    );
}