import {Descriptions} from "antd";
import {useState, useEffect} from 'react';
import {PassportService} from "../../api/PassportService";


export const PersonalInfo = ({userId}) => {

    const [passportInfo, setPassportInfo] = useState({});

    useEffect(() => {
        (async () => {
            const passportInfo = await PassportService.getUserPassportInfo(userId);
            setPassportInfo(passportInfo);
        })();
    }, [userId]);

    return (

        <Descriptions title="Мои данные" size='middle' contentStyle={{fontSize: '1.1em'}}  labelStyle={{fontWeight:500, fontSize: '1.1em'}} >
            <Descriptions.Item
                label="ФИО">{passportInfo['first_name']} {passportInfo['last_name']} {passportInfo['middle_name']}
            </Descriptions.Item>
            <Descriptions.Item label="Номер телефона">{passportInfo.phone}</Descriptions.Item>
            <Descriptions.Item
                label="Серия и номер паспорта">{passportInfo.series} {passportInfo.number}</Descriptions.Item>
            <Descriptions.Item label="Город">{passportInfo.city}</Descriptions.Item>
            <Descriptions.Item label="Адрес">{passportInfo.street} {passportInfo.house} </Descriptions.Item>
        </Descriptions>
    );
}
