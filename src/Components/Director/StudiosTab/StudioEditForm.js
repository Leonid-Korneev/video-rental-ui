import {Form, Input} from "antd";
import {useEffect} from "react";
import {StudiousService} from "../../../api/StudiosService";

export const StudioEditForm = ({
                                   selectedStudio,
                                   isEditMode,
                                   setUpdateInfoCounter,
                                   updateInfoCounter,
                                   setIsEditModalVisible
                               }) => {

    const [form] = Form.useForm();
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const onFinish = async (values) => {
        try {
            if (isEditMode) {
                const requestData = {...values, id: selectedStudio.id};
                await StudiousService.updateStudio(requestData);
            } else {
                await StudiousService.createStudio(values);
            }
            setUpdateInfoCounter(updateInfoCounter + 1);
            setIsEditModalVisible(false);
        } catch (e) {
            console.log(e.message)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (isEditMode) {
            form.setFieldsValue({
                name: selectedStudio.name,
                country: selectedStudio.country,
            });
        } else {
            form.setFieldsValue({
                name: null,
                country: null,
            });
        }
    }, [selectedStudio])

    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            id='studio-edit-form'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item
                label="Название студии"
                name="name"
                rules={[{required: true, message: 'Укажите название студии'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Страна студии"
                name="country"
                rules={[{required: true, message: 'Укажите страну студии'}]}>
                <Input/>
            </Form.Item>

        </Form>


    )
}