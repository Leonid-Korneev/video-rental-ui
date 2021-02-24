import Search from "antd/es/input/Search";
import React, {useState, useEffect, useRef} from 'react';
import {ReportService} from "../../api/ReportService";
import {Button, Table} from "antd";
import style from './FilmsTableByDirector.module.css'
import {useReactToPrint} from 'react-to-print';

export const FilmsTableByDirector = () => {

    const componentRef = useRef();
    const [director, setDirector] = useState('');
    const [filmsList, setFilmsList] = useState();
    const [loading, setLoading] = useState(false);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            const films = await ReportService.getFilmsByDirector(director);
            setFilmsList(films);
            setLoading(false);
        })()
    }, [director])

    const onSearch = (value) => {
        setDirector(value.trim())
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
        }

    ];

    return (
        <>
            <Search placeholder="Введите имя режиссера" onSearch={onSearch} style={{width: 300, marginRight: '10px'}}/>

            <Button onClick={handlePrint} disabled={!director.length} type='primary'>Распечатать отчёт</Button>
            <div ref={componentRef} className={style.tableWrapper}>
                <div className={style.visibleOnlyForPrint}>Список фильмов режиссера: {director}</div>
                <Table loading={loading} pagination={{hideOnSinglePage: true, pageSize: 40}} dataSource={dataSource}
                       columns={columns}/>
            </div>
        </>
    );
}