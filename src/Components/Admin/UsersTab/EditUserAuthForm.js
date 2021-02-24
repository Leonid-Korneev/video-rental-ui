import {Form, Input, Select} from "antd";
import {Option} from "antd/es/mentions";
import {AuthoritiesService} from "../../../api/AuthoritiesService";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

export const EditUserAuthForm = ({selectedUser, authoritiesList, setUpdateInfoCounter,updateInfoCounter, setIsEditUserAuthModalVisible}) => {

    const [form] = Form.useForm();
    const authOptions = authoritiesList.map(auth => (<Option value={auth.id} key={auth.id}>{auth.authority}</Option>));

    const onFinish = async (values) => {
        const requestData = {...values ,userId: selectedUser.id};
        await AuthoritiesService.changeUserAuthority(requestData);
        setIsEditUserAuthModalVisible(false);
        setUpdateInfoCounter(updateInfoCounter+1);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            id='edit-auth-form'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item
                label="Уровень прав"
                name='authorityId'
                style={{width: "100%"}}>
                <Select    style={{width: "100%"}} defaultValue={selectedUser["authority_id"]} >
                    {authOptions}
                </Select>
            </Form.Item>

        </Form>
    );
}