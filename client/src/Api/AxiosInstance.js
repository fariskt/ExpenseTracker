import axios from 'axios'

const Axioinstance = axios.create({
    // baseURL: "https://cashvio.onrender.com/api",
    baseURL: "http://localhost:5000/api",
    withCredentials:true,
    headers: {
        "Content-Type": "application/json"
    }
})

export default Axioinstance;