import * as axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})


export const LogbookService = {
    async getUserLogbooks(userId) {
        try {
            const res = await instance.get(`logbook/${userId}`);
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async createLogbook(requestData) {
        try {
            await instance.post(`logbook`, requestData);
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async updateLogbook(requestData) {
        try {
            await instance.put(`logbook`, requestData);
        } catch (e) {
            console.log('Server internal error')
        }
    }

}