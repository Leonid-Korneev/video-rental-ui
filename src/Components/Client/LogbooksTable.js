import {Button, Popconfirm, Table} from "antd";
import moment from 'moment';
import {LogbookService} from "../../api/LogbookService";

export const LogbooksTable = ({loading,logbooksList, filmsList, setUpdateInfoCounter, updateInfoCounter}) => {


    const dataSource = logbooksList ? [...logbooksList].map((obj, i) => {
      const filmInfo =  filmsList.filter(film=> film.id === obj.film_id);
        return {...obj, title:filmInfo[0].title, key: i};
    }) : [];


    const returnFilm = async (info)=> {
        const currentDate = moment().format("YYYY-MM-DD");
        const requestData = {
            userId:  info["user_id"],
            filmId: info['film_id'],
            returnDate : currentDate,
            issueDate : moment(info['issue_date']).format("YYYY-MM-DD"),
            logBookId : info.id
        };
        await LogbookService.updateLogbook(requestData);
        setUpdateInfoCounter(updateInfoCounter+1);
    }


    const columns = [
        {
            title: 'Название фильма',
            dataIndex: 'title',
            key: 'name',
        },

        {
            title: 'Дата начала проката фильма',
            dataIndex: 'issue_date',
            key: 'issue_date',
            render: (date)=> {
                return (<>
                {moment(date).format("YYYY-MM-DD")}
                </>)
            }
        },


        {
            title: 'Дата возврата фильма',
            dataIndex: 'return_date',
            key: 'return_date',
            render: (date)=> {
                return (<>
                 {date ? moment(date).format("YYYY-MM-DD") : 'Вы еще не вернули фильм.'}
                </>)
            }
        },

        {
            title: 'Действия',
            dataIndex: '',
            key: 'index',
            render: (film) => {
                const rentButton = <Button size="small" type="primary" key={film.title}>{`Вернуть фильм`}</Button>
                return (<>
                    {film['return_date']? null :
                        <Popconfirm
                            key={film.id}
                            title="Вы действительно хотите взять этот фильм в прокат?"
                            onConfirm={()=>{
                                returnFilm(film); }}
                            okText="Да"
                            cancelText="Нет"
                        >
                            {rentButton}
                        </Popconfirm>}

                </>)
            }
        }
    ];


    return (
        <div>
            <Table loading={loading} dataSource={dataSource}
                   columns={columns}/>
        </div>
    )
}