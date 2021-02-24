import {Button, Form, Input} from "antd";
import style from './LoginForm.module.css'
import {UsersService} from "../../api/UsersService";
import {useState} from 'react'
import {Redirect} from "react-router-dom";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

export const LoginForm = ({setLoggedIn, userInfoUpdateCounter, setUserInfo, setUserInfoUpdateCounter, loggedIn}) => {

    const [loginFailed, setLoginFailed] = useState(false);

    const onFinish = async (values) => {
        const userInfo = await UsersService.login(values);
        if (userInfo) {
            setUserInfo(userInfo);
            setUserInfoUpdateCounter(userInfoUpdateCounter + 1);
            setLoggedIn(true);
            setLoginFailed(false);
        } else {
            setLoginFailed(true);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (loggedIn) {
        return <Redirect to={"/"}/>
    }

    return (
        <div className={style.formWrapper}>
            <div className={style.contentWrapper}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>

                    <Form.Item
                        label="Логин"
                        name="username"
                        rules={[{required: true, message: 'Пожалуйста введите логин!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{required: true, message: 'Пожалуйста введите пароль!'}]}>
                        <Input.Password/>
                    </Form.Item>

                    {loginFailed ? <div className={style.failAlarm}> Неправильный логин или пароль!</div> : null}

                    <Form.Item>
                        <div className={style.submitButtonWrapper}>
                            <Button type="primary" htmlType="submit">
                                Войти
                            </Button>
                        </div>
                    </Form.Item>

                </Form>

                <div className={style.registrationTitle}>У вас отсуствует аккаунт? <span
                    className={style.registration} onClick={() => {
                    window.location.href = "registration"
                }}>Зарегистрироваться!</span></div>

            </div>

        </div>
    );
}