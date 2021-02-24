import {Redirect} from "react-router-dom";
import {AppHeader} from "./AppHeader";
import {ClientPanel} from "./Client/ClientPanel";
import {AdminPanel} from "./Admin/AdminPanel";
import {DirectorPanel} from "./Director/DirectorPanel";
import {AccountantPanel} from "./Accountant/AccountantPanel";
import style from './WellcomePage.module.css'


export const Main = ({userInfo, setLoggedIn, setUserInfo})=> {
    if(!userInfo.user) {
        return <Redirect to={"/"}/>
    }
    return (
        <>
            <div className={style.headerWrapper}>
            <AppHeader setUserInfo={setUserInfo} setLoggedIn={setLoggedIn} userInfo={userInfo}/>
            </div>
            {userInfo.authority.authority==='client' ?  <ClientPanel userId={userInfo.user.userId}/> :null }
            {userInfo.authority.authority==='admin' ?  <AdminPanel /> : null }
            {userInfo.authority.authority==='director' ?  <DirectorPanel /> : null }
            {userInfo.authority.authority==='accountant' ?  <AccountantPanel /> : null }
        </>
    );
}