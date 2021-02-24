import {Button, notification, Popconfirm, Table} from "antd";
import moment from 'moment';
import {LogbookService} from "../../api/LogbookService";

export const FilmsTable = ({filmsList, loading, userId, setUpdateInfoCounter, updateInfoCounter}) => {

    const onConfirmRent = async (userId, filmId) => {
        const currentDate = moment().format("YYYY-MM-DD HH:00");
        const requestData = {userId: userId, filmId: filmId, issueDate: currentDate};
        try {
            await LogbookService.createLogbook(requestData);
            setUpdateInfoCounter(updateInfoCounter + 1);
        } catch (e) {
            if (e.response.data === 'У данного пользователя уже есть этот фильм.') {
                notification.open({
                    message: 'Произошла ошибка при попытке арендовать фильм.',
                    description: 'Вы уже арендуете данный фильм.',
                });
            }
        }
    }

    const dataSource = filmsList ? [...filmsList].map((obj, i) => {
        return {...obj, key: i};
    }) : [];

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
                const rentButton = <Button size="small" type="primary" key={film.id}>{`Взять в прокат`}</Button>
                return (<>
                    <Popconfirm
                        key={film.id}
                        title="Вы действительно хотите взять этот фильм в прокат?"
                        onConfirm={() => {
                            onConfirmRent(userId, film.id)
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


    return (
            <Table loading={loading} dataSource={dataSource} columns={columns}/>);
}