import axios from "axios";

export async function service_getIfAuth() {

    try {
        console.log('hello everybody');
        const response = await axios.get<{auth:boolean}>('http://localhost:3000/api/auth');
        console.log({responseaxios:response.data});
        return response.data ;
    }
    catch (err) {
        return null;
    }

}