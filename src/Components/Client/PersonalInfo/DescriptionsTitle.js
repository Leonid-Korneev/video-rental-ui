import {Button} from "antd";
import style from './DescriptionsTitle.module.css'

export const DescriptionsTitle = ({setIsEditModalVisible}) => {

    const onChangePersonalInfoClick = () => {
        setIsEditModalVisible(true);
    }

    return (
        <div className={style.titleWrapper}>
            <div>Персональные данные</div>
            <div><Button onClick={onChangePersonalInfoClick} type='primary'>Изменить данные</Button></div>
        </div>
    );
}