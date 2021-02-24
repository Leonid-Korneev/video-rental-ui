import style from "./FilmsTableByDirector.module.css";
import {Button, Table} from "antd";
import {ReportService} from "../../api/ReportService";
import {useState, useEffect, useRef} from 'react';
import {PassportService} from "../../api/PassportService";
import {useReactToPrint} from "react-to-print";


export const ExpiredUsersTable = () => {

    const [expiredUsers, setExpiredUsers] = useState([]);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        (async () => {
            const expiredUsers = await ReportService.getExpiredUsers();
            const usersPassportsArray = [];
            for (let i=0; i<expiredUsers.length; i++) {
                const userInfo = await PassportService.getUserPassportInfo(expiredUsers[i]['user_id']);
                usersPassportsArray.push(userInfo);
            }
            setExpiredUsers(usersPassportsArray);
        })()
    }, []);


    const dataSource = expiredUsers.length ? [...expiredUsers].map((obj, i) => {
        return {...obj, key: i};
    }) : [];

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Фамилия',
            dataIndex: 'last_name',
            key: 'last_name',
        },

        {
            title: 'Отчество',
            dataIndex: 'middle_name',
            key: 'middle_name',
        },
        {
            title: 'Город',
            dataIndex: 'city',
            key: 'city',
        },

        {
            title: 'Номер телефона',
            dataIndex: 'phone',
            key: 'phone',
        }

    ];


    return (
        <>
            <div className={style.searchWrapper}>
                <Button onClick={handlePrint} type='primary'>Распечатать отчёт</Button>
            </div>
            <div ref={componentRef} className={style.tableWrapper}>
                <div className={style.visibleOnlyForPrint}>Список клиентов, которые держат фильм более 10 дней.</div>
                <Table pagination={{hideOnSinglePage: true, pageSize:40}} dataSource={dataSource} columns={columns}/>
            </div>
        </>
    );
}