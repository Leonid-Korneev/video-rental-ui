import {Tabs} from "antd";
import {UsersTable} from "./UsersTab/UsersTable";
import {useState, useEffect} from 'react';
import {UsersService} from "../../api/UsersService";
import {AuthoritiesService} from "../../api/AuthoritiesService";
import {AuthoritiesTable} from "./AuthTab/AuthoritiesTable";
import {AuthorityTableControlPanel} from "./AuthTab/AuthorityTableControlPanel";
import {AddAuthorityModal} from "./AuthTab/AddAuthorityModal";

const {TabPane} = Tabs;

export const AdminPanel = () => {

    const [userslist, setUserslist] = useState([]);
    const [authoritiesList, setAuthoritiesList] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [updateInfoCounter, setUpdateInfoCounter] = useState(0);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            setUsersLoading(true);
            const users = await UsersService.getUsersList();
            const authorities = await AuthoritiesService.getAuthoritiesList();
            setUserslist(users);
            setAuthoritiesList(authorities);
            setUsersLoading(false);
        })();
    }, [updateInfoCounter])


    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Список пользователей" key="1">
                <UsersTable usersLoading={usersLoading} userslist={userslist} authoritiesList={authoritiesList}
                            setUpdateInfoCounter={setUpdateInfoCounter}
                            updateInfoCounter={updateInfoCounter}/>
            </TabPane>
            <TabPane tab="Список прав" key="2">
                <AuthorityTableControlPanel setIsAddModalVisible={setIsAddModalVisible}/>
                <AuthoritiesTable setUpdateInfoCounter={setUpdateInfoCounter}
                                  updateInfoCounter={updateInfoCounter} authoritiesList={authoritiesList}/>
                <AddAuthorityModal
                    setUpdateInfoCounter={setUpdateInfoCounter}
                    updateInfoCounter={updateInfoCounter}
                    isAddModalVisible={isAddModalVisible} setIsAddModalVisible={setIsAddModalVisible}/>
            </TabPane>
        </Tabs>
    )
}