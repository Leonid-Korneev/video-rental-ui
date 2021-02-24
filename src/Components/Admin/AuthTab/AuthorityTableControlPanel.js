import {Button} from "antd";
import style from './AuthorityTableControlPanel.module.css'

export const AuthorityTableControlPanel = ({setIsAddModalVisible}) => {

    const onAddAuthClick = () => {
        setIsAddModalVisible(true);
    };

    return (
        <div className={style.AuthorityTableControlPanelWrapper}>
            <Button type='primary' onClick={() => {
                onAddAuthClick()
            }}>Создать новый уровень прав</Button>
        </div>
    );
}