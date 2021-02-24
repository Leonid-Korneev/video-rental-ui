import {Tabs} from "antd";
import {FilmsTableGroupByGenre} from "./FilmsTableGroupByGenre";
import {FilmsTableByDirector} from "./FilmsTableByDirector";
import {RentedFilmsTable} from "./RentedFilmsTable";
import {ExpiredUsersTable} from "./ExpiredUsersTable";
import style from './FilmsTableByDirector.module.css'

const {TabPane} = Tabs;

export const AccountantPanel = () => {

    return (
        <div className={style.tabsWrapper}>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Фильмы по жанрам" key="1">
                <FilmsTableGroupByGenre />
            </TabPane>

            <TabPane tab="Фильмы по режиссеру" key="2">
                <FilmsTableByDirector/>
            </TabPane>

            <TabPane tab="Фильмы на руках" key="3">
                <RentedFilmsTable/>
            </TabPane>

            <TabPane tab="Клиенты, которые держат фильм более 10 суток." key="4">
                <ExpiredUsersTable/>
            </TabPane>
        </Tabs>
        </div>
    );
}