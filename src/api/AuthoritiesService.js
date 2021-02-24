import * as axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
})


export const AuthoritiesService = {
    async getAuthoritiesList() {
        try {
            const res = await instance.get('authority');
            return res.data
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async changeUserAuthority(requestData) {
        try {
            await instance.put('user', requestData);
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async addAuthority(requestData) {
        try {
            await instance.post('authority', requestData);
        } catch (e) {
            console.log('Server internal error')
        }
    },

    async deleteAuthority(authId) {
        try {
            await instance.delete(`authority/${authId}`);
        } catch (e) {
            console.log('Server internal error')
        }
    }

}


