import {LoginForm} from "./Login/LoginForm";
import {useState, useEffect} from 'react'
import style from './WellcomePage.module.css'
import {UsersService} from "../api/UsersService";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {Main} from "./Main";
import {RegistrationModal} from "./Registration/RegistrationModal";


export const WellcomePage = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userInfoUpdateCounter, setUserInfoUpdateCounter] = useState(0);

    useEffect(() => {
        (async () => {
            if (userInfo.user) {
                const user = await UsersService.getUserInfo(userInfo.user.userId);
                setUserInfo({...userInfo, user: {...userInfo.user, username: user.username}});
            }
        })();
    }, [userInfoUpdateCounter])

    return (
        <div className={style.content}>
            <BrowserRouter>
                <Route path="/login" render={
                    () => <LoginForm setUserInfoUpdateCounter={setUserInfoUpdateCounter}
                                     loggedIn={loggedIn}
                                     userInfoUpdateCounter={userInfoUpdateCounter}
                                     setUserInfo={setUserInfo}
                                     setLoggedIn={setLoggedIn}/>}/>

                <Route path="/main" render={() => (
                    <Main setUserInfo={setUserInfo} setLoggedIn={setLoggedIn} userInfo={userInfo}/>)}/>
                <Route path="/registration" render={() => (<RegistrationModal/>)}/>
                <Route exact path="/" render={() => {
                    return (
                        loggedIn ?
                            <Redirect to="/main"/> :
                            <Redirect to="/login"/>
                    )
                }}
                />
            </BrowserRouter>
        </div>
    )
}