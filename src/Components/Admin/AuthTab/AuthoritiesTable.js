import {Button, Popconfirm, Table} from "antd";
import {AuthoritiesService} from "../../../api/AuthoritiesService";


export const AuthoritiesTable = ({authoritiesList, setUpdateInfoCounter, updateInfoCounter}) => {

    const dataSource = authoritiesList ? [...authoritiesList].map((obj, i) => {
        return {...obj, key: i};
    }) : [];

    const onAuthDelete = async (authId) => {
        try {
            await AuthoritiesService.deleteAuthority(authId);
            setUpdateInfoCounter(updateInfoCounter + 1);
        } catch (e) {
            console.log(e.message);
        }
    }

    const columns = [

        {
            title: 'Уровень прав',
            dataIndex: 'authority',
            key: 'authority',
        },
        {
            title: 'Действия',
            dataIndex: '',
            key: 'index',
            render: (auth) => {
                const rentButton = <Button size="small" type="danger"
                                           key={auth.id}>{`Удалить`}</Button>
                return (<>
                    <Popconfirm
                        key={auth.id}
                        title="Вы действительно хотите удалить данный уровень прав?"
                        onConfirm={() => {
                            onAuthDelete(auth.id)
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

    return (<Table dataSource={dataSource} columns={columns}/>);
}