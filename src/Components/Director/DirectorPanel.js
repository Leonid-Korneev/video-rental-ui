import {Button, Tabs} from "antd";
import {useEffect, useState} from "react";
import {FilmsService} from "../../api/FilmsService";
import {StudiousService} from "../../api/StudiosService";
import {FilmsDirectorTable} from "./FilmsTab/FilmsDirectorTable";
import {StudiosTable} from "./StudiosTab/StudiosTable";

const {TabPane} = Tabs;

export const DirectorPanel = ()=> {

    const [filmsList, setFilmsList] = useState([]);
    const [studiousList, setStudiousList] = useState([]);
    const [updateInfoCounter, setUpdateInfoCounter] = useState(0);


    useEffect(() => {
        (async () => {
            const films = await FilmsService.getFilmsList();
            const studios = await StudiousService.getStudiousList();
            setFilmsList(films);
            setStudiousList(studios);
        })();
    }, [updateInfoCounter])



    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Список  фильмов" key="1">
                <FilmsDirectorTable filmsList={filmsList} studiousList={studiousList}
                                    setUpdateInfoCounter={setUpdateInfoCounter}
                                    updateInfoCounter={updateInfoCounter}
                />
            </TabPane>
            <TabPane tab="Список студий" key="2">
                <StudiosTable
                    setUpdateInfoCounter={setUpdateInfoCounter}
                    updateInfoCounter={updateInfoCounter}
                    studiousList={studiousList}/>
            </TabPane>
        </Tabs>
    )
}