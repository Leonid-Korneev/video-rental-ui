import {LoginForm} from "./Login/LoginForm";
import {useState, useEffect} from 'react'
import style from './WellcomePage.module.css'
import {UsersService} from "../api/UsersService";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {Main} from "./Main";


export const WellcomePage = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userInfoUpdateCounter, setUserInfoUpdateCounter] = useState(0);

    useEffect(() => {
        (async () => {
            if (userInfo.user) {
                const user = await UsersService.getUserInfo(userInfo.user.userId);
                console.log(userInfo)
                setUserInfo({...userInfo, user:{...userInfo.user, username: user.username}});
            }
        })();

    }, [userInfoUpdateCounter, userInfo])

    return (<div className={style.content}>


            <BrowserRouter>
                <Route path="/login" render={() => <LoginForm setUserInfoUpdateCounter={setUserInfoUpdateCounter}
                                                              loggedIn={loggedIn}
                                                              userInfoUpdateCounter={userInfoUpdateCounter}
                                                              setUserInfo={setUserInfo}
                                                              setLoggedIn={setLoggedIn}/>}/>

                <Route path="/main" render={() => (<Main userInfo={userInfo}/>)}/>
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