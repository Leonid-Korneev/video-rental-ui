import Modal from "antd/es/modal/Modal";
import {EditUserAuthForm} from "./EditUserAuthForm";
import {UsersTable} from "./UsersTable";


export const EditUserAuthModal = ({
                                      isModalVisible,
                                      selectedUser,
                                      setIsEditUserAuthModalVisible,
                                      authoritiesList,
                                      updateInfoCounter,
                                      setUpdateInfoCounter
                                  }) => {

    const onCancel = () => {
        setIsEditUserAuthModalVisible(false);
    }

    return (<>
        <Modal title="Изменение уровня прав пользователя" visible={isModalVisible} onCancel={onCancel}
               okButtonProps={{
                   form: 'edit-auth-form',
                   key: 'submit',
                   htmlType: 'submit',
               }}>
            <EditUserAuthForm
                setUpdateInfoCounter={setUpdateInfoCounter}
                updateInfoCounter={updateInfoCounter}
                setIsEditUserAuthModalVisible={setIsEditUserAuthModalVisible}
                authoritiesList={authoritiesList} selectedUser={selectedUser}/>
        </Modal>
    </>)
}