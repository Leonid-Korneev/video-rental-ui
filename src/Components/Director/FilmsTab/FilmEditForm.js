import {Form, Input, Select} from "antd";
import {useEffect} from "react";
import {Option} from "antd/es/mentions";
import {FilmsService} from "../../../api/FilmsService";

export const FilmEditForm = ({
                                 studiousList,
                                 isEditMode,
                                 selectedFilm,
                                 setIsEditModalVisible,
                                 setUpdateInfoCounter,
                                 updateInfoCounter
                             }) => {

    const [form] = Form.useForm();
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const studiosOptions = studiousList.map(studio => (
        <Option value={studio.id} key={studio.id}>{studio.name}</Option>
    ))

    const onFinish = async (values) => {
        try {
            if (isEditMode) {
                await FilmsService.updateFilm({...values, id: selectedFilm.id})
            } else {
                await FilmsService.createFilm(values);
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsEditModalVisible(false);
            setUpdateInfoCounter(updateInfoCounter+1);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (isEditMode) {
            form.setFieldsValue({
                title: selectedFilm.title,
                genre: selectedFilm.genre,
                studioId: selectedFilm['studio_id'],
                director: selectedFilm.director,
                actors: selectedFilm.actors,
                year: selectedFilm.year,
                annotation: selectedFilm.annotation,
                price: selectedFilm.price
            });
        } else {
            form.setFieldsValue({
                title: null,
                genre: null,
                studioId: null,
                director: null,
                actors: null,
                year: null,
                annotation: null,
                price: null
            });
        }

    }, [selectedFilm])


    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            id='film-edit-form'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item
                label="Название фильма"
                name="title"
                rules={[{required: true, message: 'Укажите название фильма'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Жанр фильма"
                name="genre"
                rules={[{required: true, message: 'Укажите жанр фильма'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Студия производитель"
                name='studioId'
                rules={[{required: true, message: 'Укажите студию'}]}>

                <Select defaultValue={selectedFilm["studio_id"]} >
                    {studiosOptions}
                </Select>
            </Form.Item>

            <Form.Item
                label="Кинорежиссёр"
                name="director"
                rules={[{required: true, message: 'Укажите режиссера фильма'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Актерский состав"
                name="actors"
                rules={[{required: true, message: 'Укажите актерский состав'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Год выпуска"
                name="year"
                rules={[{required: true, message: 'Укажите год выпуска'}, {
                    max: 5,
                    message: 'Не боллее 5-ти символов'
                }]}>
                <Input type='number'/>
            </Form.Item>

            <Form.Item
                label="Описание"
                name="annotation"
                rules={[{required: true, message: 'Укажите описание фильма'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Цена проката"
                name="price"
                rules={[{required: true, message: 'Укажите цену проката'}]}>
                <Input/>
            </Form.Item>

        </Form>
    )
}