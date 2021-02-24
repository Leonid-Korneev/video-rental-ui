import {ReportService} from "../../api/ReportService";
import {useState, useEffect, useRef} from 'react';
import {Button, Table} from "antd";
import {FilmsService} from "../../api/FilmsService";
import style from './FilmsTableByDirector.module.css'
import {useReactToPrint} from "react-to-print";

export const RentedFilmsTable = () => {

    const [rentedFilmsList, setRentedFilmsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            const films = await FilmsService.getFilmsList();
            const rentedFilmsIds = await ReportService.getRentedFilms();
            const rentedFilmsList = rentedFilmsIds.map(rentedFilm => {
                let filteredFilm = films.filter(film => rentedFilm['film_id'] === film.id)

                return (filteredFilm[0]);

            })
            setRentedFilmsList(rentedFilmsList);
            setLoading(false);
        })()

    }, [])

    const dataSource = rentedFilmsList ? [...rentedFilmsList].map((obj, i) => {
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
        }

    ];

    return (
        <>
            <div className={style.searchWrapper}>
                <Button onClick={handlePrint} type='primary'>Распечатать отчёт</Button>
            </div>
            <div ref={componentRef} className={style.tableWrapper}>
                <div className={style.visibleOnlyForPrint}>Список фильмов, которые находятся в аренде.</div>
                <Table loading={loading} pagination={{hideOnSinglePage: true, pageSize: 40}} dataSource={dataSource}
                       columns={columns}/>
            </div>
        </>
    );
}