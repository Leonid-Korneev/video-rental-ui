import React, {useState, useEffect, useRef} from 'react'
import {ReportService} from "../../api/ReportService";
import {Button, Table} from "antd";
import style from "./FilmsTableByDirector.module.css";
import {useReactToPrint} from "react-to-print";


export const FilmsTableGroupByGenre = () => {

    const componentRef = useRef();
    const [filmsList, setFilmsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            const films = await ReportService.getFilmsGroupByGenre();
            setFilmsList(films);
            setLoading(false);
        })()

    }, [])

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
        }

    ];

    return (
        <>
            <div className={style.searchWrapper}>
                <Button onClick={handlePrint} type='primary'>Распечатать отчёт</Button>
            </div>
            <div ref={componentRef} className={style.tableWrapper}>
                <div className={style.visibleOnlyForPrint}>Список всех фильмов, сгруппированных по жанрам.</div>
                <Table pagination={{hideOnSinglePage: true, pageSize:40}} loading={loading} dataSource={dataSource} columns={columns}/>
            </div>
        </>
    );
}
