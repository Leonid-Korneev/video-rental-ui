import Modal from "antd/es/modal/Modal";
import {StudioEditForm} from "./StudioEditForm";
import {FilmsDirectorTable} from "../FilmsTab/FilmsDirectorTable";

export const StudioEditModal = ({selectedStudio, setIsEditModalVisible, isEditModalVisible,setUpdateInfoCounter,updateInfoCounter}) => {

    const isEditMode = !!selectedStudio.id
    const onCancel = () => {
        setIsEditModalVisible(false);
    }

    return (

        <Modal onCancel={onCancel} title={isEditMode ? 'Изменение даных о студии' : 'Добавление новой студии'}
               visible={isEditModalVisible} okButtonProps={{
            form: 'studio-edit-form',
            key: 'submit',
            htmlType: 'submit',
        }}>
            <StudioEditForm setUpdateInfoCounter={setUpdateInfoCounter}
                            setIsEditModalVisible={setIsEditModalVisible}
                            updateInfoCounter={updateInfoCounter} selectedStudio={selectedStudio} isEditMode={isEditMode}/>
        </Modal>

    )
}