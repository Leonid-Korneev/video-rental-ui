import {Button, Popconfirm, Table} from "antd";
import {EditUserAuthModal} from "./EditUserAuthModal";
import {useState} from 'react';


export const UsersTable = ({userslist, authoritiesList, setUpdateInfoCounter, updateInfoCounter, usersLoading}) => {

    const [isEditUserAuthModalVisible, setIsEditUserAuthModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const dataSource = userslist ? [...userslist].map((obj, i) => {
        const auth = authoritiesList.filter(auth => auth.id === obj.authority_id);
        return {...obj, key: i, authorityName: auth[0]?.authority};
    }) : [];


    const columns = [
        {
            title: 'Имя пользователя',
            dataIndex: 'username',
            key: 'username',
        },

        {
            title: 'Уровень прав',
            dataIndex: 'authorityName',
            key: 'authorityName',
        },

        {
            title: 'Действия',
            dataIndex: '',
            key: 'index',
            render: (user) => {
                const rentButton = <Button size="small" type="primary"
                                           key={user.id}>{`Изменить права пользователя.`}</Button>
                return (<>
                    <Popconfirm
                        key={user.id}
                        title="Вы действительно хотите изменить уровень прав пользователя?"
                        onConfirm={() => {
                            setSelectedUser(user);
                            setIsEditUserAuthModalVisible(true);
                        }}
                        okText="Да"
                        cancelText="Нет"
                    >
                        {rentButton}
                    </Popconfirm>
                </>)
            }
        }
    ];

    return (<>
            <Table dataSource={dataSource} columns={columns} loading={usersLoading}/>
            <EditUserAuthModal authoritiesList={authoritiesList}
                               isModalVisible={isEditUserAuthModalVisible}
                               selectedUser={selectedUser}
                               setUpdateInfoCounter={setUpdateInfoCounter}
                               updateInfoCounter={updateInfoCounter}
                               setIsEditUserAuthModalVisible={setIsEditUserAuthModalVisible}/>
        </>
    )
}