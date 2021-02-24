import * as axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})


export const ReportService = {
    async getFilmsGroupByGenre() {
        try {
            const res = await instance.get(`report/oder-by-genre`);
            return res.data;
        } catch (e) {
            console.log('Server internal error');
        }
    },

    async getFilmsByDirector(directorName) {
        try {
            const res = await instance.get(`report/director?director=${directorName}`);
            return res.data;
        } catch (e) {
            console.log('Server internal error');
        }
    },

    async getRentedFilms() {
        try {
            const res = await instance.get(`report/rented-films`);
            return res.data;
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async getExpiredUsers() {
        try {
            const res = await instance.get(`report/10days`);
            return res.data;
        } catch (e) {
            console.log('Server internal error')
        }
    }



}