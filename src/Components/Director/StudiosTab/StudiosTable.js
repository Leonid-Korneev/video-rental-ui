import {Button, Popconfirm, Table} from "antd";
import {useState} from 'react';
import {StudioEditModal} from "./StudioEditModal";
import style from './../FilmsTab/FilmsDirectorTableControlPanel.module.css'

export const StudiosTable = ({studiousList, setUpdateInfoCounter, updateInfoCounter}) => {

    const [selectedStudio, setSelectedStudio] = useState({});
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const dataSource = studiousList ? [...studiousList].map((obj, i) => {
        return {...obj, key: i};
    }) : [];

    const onConfirmChange = (studio) => {
        setSelectedStudio(studio);
        setIsEditModalVisible(true);
    }


    const onAddStudioClick = () => {
        setSelectedStudio({});
        setIsEditModalVisible(true);
    }


    const columns = [
        {
            title: 'Название студии',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Страна',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Действия',
            dataIndex: '',
            key: 'index',
            render: (studio) => {
                const changeButton = <Button size="small" type="primary"
                                             key={studio.id}>{`Изменить`}</Button>
                return (<>
                    <Popconfirm
                        key={studio.id}
                        title="Вы действительно хотите изменить данные о  студии?"
                        onConfirm={() => {
                            onConfirmChange(studio)
                        }}
                        okText="Да"
                        cancelText="Нет">
                        {changeButton}
                    </Popconfirm>
                </>)
            }
        }
    ];

    return (
        <>
            <div className={style.addButton}>
                <Button onClick={onAddStudioClick} type='primary'>Добавить студию</Button>
            </div>
            <Table dataSource={dataSource} columns={columns}/>
            <StudioEditModal
                setUpdateInfoCounter={setUpdateInfoCounter}
                updateInfoCounter={updateInfoCounter}
                isEditModalVisible={isEditModalVisible} selectedStudio={selectedStudio}
                setIsEditModalVisible={setIsEditModalVisible}/>
        </>

    )
}