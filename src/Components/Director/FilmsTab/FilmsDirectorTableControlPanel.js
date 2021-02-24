import {Button} from "antd";
import style from './FilmsDirectorTableControlPanel.module.css'

export const FilmsDirectorTableControlPanel = ({setIsEditModalVisible,setSelectedFilm})=> {

    const onAddClick = ()=> {
        setSelectedFilm({});
        setIsEditModalVisible(true);
    }

    return (
        <div className={style.addButton}>
        <Button type='primary' onClick={onAddClick}>Добавить новый фильм</Button>
        </div>
    )
}