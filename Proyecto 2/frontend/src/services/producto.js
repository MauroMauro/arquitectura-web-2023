import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/products'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('==> request.then(response => response.data): ', request.then(response => response.data) )
    
    return request.then(response => response.data)
}

export default {
    getAll
}