import Modal from "antd/es/modal/Modal";
import {FilmEditForm} from "./FilmEditForm";

export const EditFilmModal = ({
                                  isEditModalVisible,
                                  setIsEditModalVisible,
                                  selectedFilm,
                                  studiousList,
                                  setUpdateInfoCounter,
                                  updateInfoCounter
                              }) => {

    const isEditMode = !!selectedFilm.id

    const onCancel = () => {
        setIsEditModalVisible(false);
    }

    return (
        <Modal onCancel={onCancel} title={isEditMode ? 'Изменение даных о фильме' : 'Добавление нового фильма'}
               visible={isEditModalVisible} okButtonProps={{
            form: 'film-edit-form',
            key: 'submit',
            htmlType: 'submit',
        }}>
            <FilmEditForm setIsEditModalVisible={setIsEditModalVisible} isEditMode={isEditMode}
                          setUpdateInfoCounter={setUpdateInfoCounter}
                          updateInfoCounter={updateInfoCounter}
                          studiousList={studiousList} selectedFilm={selectedFilm}/>
        </Modal>
    )
}