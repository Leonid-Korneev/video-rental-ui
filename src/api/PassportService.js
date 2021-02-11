import * as axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})


export const PassportService = {
    async getUserPassportInfo(userId) {
        try {
            const res = await instance.get(`user/passport/${userId}`);
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    },

}