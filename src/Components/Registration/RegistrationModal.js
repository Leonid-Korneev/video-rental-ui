import Modal from "antd/es/modal/Modal";
import {useState} from 'react'
import {RegistrationForm} from "./RegistrationForm";
import {Redirect} from "react-router-dom";

export const RegistrationModal = ()=> {


    const [registrationCanceled, setRegistrationCanceled] = useState(false);

    const onCancel = ()=> {
        setRegistrationCanceled(true);
    }

    if(registrationCanceled) {
        return <Redirect to={'/login'}/>
    }

    return (
        <Modal title="Регистрация" visible={true} onCancel={onCancel}
               okButtonProps={{
                   form: 'registration-form',
                   key: 'submit',
                   htmlType: 'submit',
               }}>

            <RegistrationForm />

        </Modal>
    );
}