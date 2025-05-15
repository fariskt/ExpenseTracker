import axios from 'axios'

const Axioinstance = axios.create({
    baseURL: "https://cashvio.onrender.com/api",
    withCredentials:true,
    headers: {
        "Content-Type": "application/json"
    }
})

export default Axioinstance;