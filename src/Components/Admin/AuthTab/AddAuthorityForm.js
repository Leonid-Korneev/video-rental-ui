import {Form, Input} from "antd";
import {AuthoritiesService} from "../../../api/AuthoritiesService";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};


export const AddAuthorityForm = ({setUpdateInfoCounter, updateInfoCounter, setIsAddModalVisible}) => {

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            await AuthoritiesService.addAuthority(values);
            setUpdateInfoCounter(updateInfoCounter + 1);
            setIsAddModalVisible(false);
        } catch (e) {
            console.log(e.message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            id='add-auth-form'
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item
                label="Название уровня прав"
                name="authorityName"
                rules={[{required: true, message: 'Пожалуйста введите название уровня прав!'}]}
            >

                <Input/>

            </Form.Item>

        </Form>
    )
}