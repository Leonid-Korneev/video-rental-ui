import {Form, Input} from "antd";
import {useEffect} from 'react'
import {PassportService} from "../../../api/PassportService";

export const PersonalInfoEditForm = ({
                                         passportInfo,
                                         userId,
                                         setIsEditModalVisible,
                                         setPersonalInfoUpdateCounter,
                                         personalInfoUpdateCounter,
                                         setUpdatePersonalInfoProcessing
                                     }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const onFinish = async (values) => {
        setUpdatePersonalInfoProcessing(true);
        await PassportService.updateUserPassportInfo({...values, userId: userId});
        setUpdatePersonalInfoProcessing(false);
        setIsEditModalVisible(false);
        setPersonalInfoUpdateCounter(personalInfoUpdateCounter + 1);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        form.setFieldsValue({
            lastName: passportInfo['last_name'],
            firstName: passportInfo['first_name'],
            middleName: passportInfo['middle_name'],
            series: passportInfo.series,
            number: passportInfo.number,
            city: passportInfo.city,
            street: passportInfo.street,
            house: passportInfo.house,
            phone: passportInfo.phone

        });
    }, [])

    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            id='personal-info-edit-form'
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

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