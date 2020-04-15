import React, {Component} from 'react';
import './QuizList.css'
import { NavLink } from 'react-router-dom';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/loader/Loader';


class QuizList extends Component {
    state = {
        quizes: [],
        loading: true
    }
    renderQuizes = () => {
        return this.state.quizes.map((quiz, index) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }
    async componentDidMount(){
        try {
            const res = await axios.get('/quiz.json')
            const quizes = []
            console.log(res.data);

            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test No ${index + 1}`
                })
            })
            console.log(quizes);
            this.setState({
                quizes,
                loading: false
            })
            
        } catch (error) {
            console.log(error);
            
        }        
    }
    render() { 
        return ( 
            <div className='QuizList'>
                <div>
                <h1>Test</h1>
                {this.state.loading ? <Loader /> : <ul>
                    {this.renderQuizes()}
                </ul>}
                </div>
            </div>
         );
    }
}
 
export default QuizList;