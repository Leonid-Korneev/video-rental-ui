import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})

export const StudiousService = {
    async getStudiousList() {
        try {
            const res = await instance.get('studio');
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async createStudio(requestData) {
        try {
            const res = await instance.post('studio', requestData);
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async updateStudio(requestData) {
        try {
            const res = await instance.put('studio', requestData);
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    },
}