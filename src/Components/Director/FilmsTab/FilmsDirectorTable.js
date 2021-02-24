import {Button, Popconfirm, Table} from "antd";
import {useState} from 'react';
import {EditFilmModal} from "./EditFilmModal";
import {FilmsDirectorTableControlPanel} from "./FilmsDirectorTableControlPanel";
import {EditOutlined} from "@ant-design/icons";


export const FilmsDirectorTable = ({filmsList, studiousList, setUpdateInfoCounter,updateInfoCounter}) => {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState({});

    const dataSource = filmsList ? [...filmsList].map((obj, i) => {
        return {...obj, key: i};
    }) : [];

    const onConfirmChange = (film) => {
        setSelectedFilm(film);
        setIsEditModalVisible(true);
    }

    const columns = [
        {
            title: 'Название фильма',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Жанр',
            dataIndex: 'genre',
            key: 'genre',
        },

        {
            title: 'Режиссер',
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: 'Актерский состав',
            dataIndex: 'actors',
            key: 'actors',
        },

        {
            title: 'Год выпуска',
            dataIndex: 'year',
            key: 'year',
        },

        {
            title: 'Студия',
            dataIndex: 'studio_id',
            key: 'studio_id',
            render: (studio)=> {
                const filmStudio = studiousList.filter(stud=>stud.id === studio)
                return (<>{filmStudio.length ? filmStudio[0].name : null}</>)
            }
        },

        {
            title: 'Аннотация',
            dataIndex: 'annotation',
            key: 'annotation',
        },
        {
            title: 'Цена проката в сутки',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Действия',
            dataIndex: '',
            key: 'index',
            render: (film) => {
                const changeButton = <Button size="small" type="primary"
                                             key={film.id}><EditOutlined /></Button>
                return (<>
                    <Popconfirm
                        key={film.id}
                        title="Вы действительно хотите изменить данные о фильме?"
                        onConfirm={() => {
                            onConfirmChange(film)
                        }}
                        okText="Да"
                        cancelText="Нет">
                        {changeButton}
                    </Popconfirm>
                </>)
            }
        }
    ];


    return (<>
            <FilmsDirectorTableControlPanel setSelectedFilm={setSelectedFilm}
                                            setIsEditModalVisible={setIsEditModalVisible}/>
            <Table dataSource={dataSource} columns={columns}/>
            <EditFilmModal studiousList={studiousList} selectedFilm={selectedFilm}
                           setUpdateInfoCounter={setUpdateInfoCounter}
                           updateInfoCounter={updateInfoCounter}
                           setIsEditModalVisible={setIsEditModalVisible} isEditModalVisible={isEditModalVisible}/>
        </>
    );
}