import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/user",
})

export const UsersService = {
    async login(loginInfo) {
        try {
            const res = await instance.post('/login', loginInfo);
            return res.data;
        } catch (e) {
            console.log('Login failed');
        }
    },

    async getUserInfo(userId = 1) {
        try {
            const res = await instance.get(`/${userId}`);
            return res.data;
        } catch (e) {
            console.log('Server internal error!');
        }
    },

    async createUser(requestData) {
        const res = await instance.post('', requestData);
        return res.data;
    },

    async getUsersList() {
        const res = await instance.get('');
        return res.data;
    }
}