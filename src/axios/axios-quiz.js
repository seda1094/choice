import axios from 'axios'
export default  axios.create({
    baseURL: 'https://quiz-1f65d.firebaseio.com/'
})