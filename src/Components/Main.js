import {Redirect} from "react-router-dom";
import {AppHeader} from "./AppHeader";
import {ClientPanel} from "./Client/ClientPanel";


export const Main = ({userInfo})=> {
    if(!userInfo.user) {
        return <Redirect to={"/"}/>
    }
    return (
        <>
            <AppHeader userInfo={userInfo}/>
            <ClientPanel userId={userInfo.user.userId}/>
        </>
    );
}