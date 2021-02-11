import {Tabs} from "antd";
import {FilmsTable} from "./FilmsTable";
import {useEffect, useState} from 'react';
import {FilmsService} from "../../api/FilmsService";
import {LogbooksTable} from "./LogbooksTable";
import {LogbookService} from "../../api/LogbookService";
import {PersonalInfo} from "./PersonalInfo";

const {TabPane} = Tabs;

export const ClientPanel = ({userId}) => {

    const [filmsList, setFilmsList] = useState([]);
    const [logbooksList, setLogbooksList] = useState([]);
    const [filmslLoading, setFilmslLoading] = useState(true);
    const [logbookLoading, setLogbookLoading] = useState(true);
    const [updateInfoCounter, setUpdateInfoCounter] = useState(0);

    useEffect(() => {
        (async () => {
            setFilmslLoading(true);
            const films = await FilmsService.getFilmsList();
            setFilmsList(films);
            setFilmslLoading(false);
            setLogbookLoading(true);
            const logbooksList = await LogbookService.getUserLogbooks(userId);
            setLogbooksList(logbooksList);
            setLogbookLoading(false);
        })();

    }, [updateInfoCounter, userId])


    return (
        <Tabs defaultActiveKey="1" onChange={() => {
        }}>
            <TabPane tab="Список фильмов" key="1">
                <FilmsTable setUpdateInfoCounter={setUpdateInfoCounter} userId={userId} filmsList={filmsList}
                            updateInfoCounter={updateInfoCounter} loading={filmslLoading}/>
            </TabPane>
            <TabPane tab="Моя учетная запись" key="2">
                <PersonalInfo userId={userId}/>
            </TabPane>
            <TabPane tab="Мои прокаты" key="3">
                <LogbooksTable filmsList={filmsList} updateInfoCounter={updateInfoCounter}
                               setUpdateInfoCounter={setUpdateInfoCounter} logbooksList={logbooksList}
                               loading={logbookLoading}/>
            </TabPane>
        </Tabs>
    )
}