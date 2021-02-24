import Modal from "antd/es/modal/Modal";
import {AddAuthorityForm} from "./AddAuthorityForm";


export const AddAuthorityModal = ({
                                      isAddModalVisible,
                                      setIsAddModalVisible,
                                      setUpdateInfoCounter,
                                      updateInfoCounter
                                  }) => {

    const handleCancel = () => {
        setIsAddModalVisible(false);
    }

    return (
        <Modal title="Создание нового уровня прав" visible={isAddModalVisible}
               okButtonProps={{
                   form: 'add-auth-form',
                   key: 'submit',
                   htmlType: 'submit',
               }} onCancel={handleCancel}>
            <AddAuthorityForm
                setIsAddModalVisible={setIsAddModalVisible}
                setUpdateInfoCounter={setUpdateInfoCounter}
                updateInfoCounter={updateInfoCounter}/>
        </Modal>
    );
}