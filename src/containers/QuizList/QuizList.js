import React, {Component} from 'react';
import './QuizList.css'
import { NavLink } from 'react-router-dom';

import Loader from '../../components/UI/loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';


class QuizList extends Component {

    renderQuizes = () => {
        return this.props.quizes.map((quiz, index) => {
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
        this.props.fetchQuizes()       
    }
    render() { 
        return ( 
            <div className='QuizList'>
                <div>
                <h1>Test</h1>
                {this.props.loading && this.props.quizes.length !== 0 ? <Loader /> : <ul>
                    {this.renderQuizes()}
                </ul>}
                </div>
            </div>
         );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

function mapStateToProps(state) {
    // console.log(state);
    
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);