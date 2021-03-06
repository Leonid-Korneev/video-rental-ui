import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})

export const FilmsService = {
    async getFilmsList() {
        try {
            const res = await instance.get('film');
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async createFilm(requestData) {
        try {
            const res = await instance.post('film', requestData);
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async updateFilm(requestData) {
        try {
            const res = await instance.put('film', requestData);
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    }
}