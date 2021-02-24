import Modal from "antd/es/modal/Modal";
import {useState} from 'react'
import {PersonalInfoEditForm} from "./PersonalInfoEditForm";

export const PersonalInfoEditModal = ({
                                          isEditModalVisible,
                                          setIsEditModalVisible,
                                          passportInfo,
                                          userId,
                                          personalInfoUpdateCounter,
                                          setPersonalInfoUpdateCounter
                                      }) => {


    const [updatePersonalInfoProcessing, setUpdatePersonalInfoProcessing] = useState(false);

    const handleCancel = () => {
        setIsEditModalVisible(false);
    }

    return (
        <Modal title="Изменить персональные данные" visible={isEditModalVisible}
               okButtonProps={{
                   form: 'personal-info-edit-form',
                   key: 'submit',
                   htmlType: 'submit',
                   loading: updatePersonalInfoProcessing
               }} onCancel={handleCancel}>
            <PersonalInfoEditForm userId={userId} setIsEditModalVisible={setIsEditModalVisible}
                                  setUpdatePersonalInfoProcessing={setUpdatePersonalInfoProcessing}
                                  personalInfoUpdateCounter={personalInfoUpdateCounter}
                                  setPersonalInfoUpdateCounter={setPersonalInfoUpdateCounter}
                                  passportInfo={passportInfo}/>
        </Modal>
    );
}