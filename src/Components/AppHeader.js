import style from './Header.module.css'
import {Button} from "antd";


export const AppHeader = ({userInfo, setLoggedIn, setUserInfo}) => {
    return (
        <div className={style.headerWrapper}>
            <div className={style.headerContent}>

                <div className={style.title}>
                  Ваш логин: {userInfo.user.username}
                </div>
                <div className={style.title}>
                   Уровень прав: {userInfo.authority.authority}
                </div>

                <Button type='primary' onClick={() => {
                    setLoggedIn(false);
                    setUserInfo({});
                }}>Выйти</Button>
            </div>
        </div>
    );
}