import React, { Component } from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/loader/Loader';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';
import { connect } from 'react-redux';
class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount(){
        this.props.retryQuiz()
    }

    render() {
 
        return (
            <div className='Quiz'>
                <div className='QuizWrapper'>
                    <h1>Choice 🔥🔥</h1>
                    {
                        this.props.loading || !this.props.quiz 
                        ? <Loader />
                        : this.props.isFinished
                         ? <FinishedQuiz
                           results={this.props.results}
                           quiz={this.props.quiz}
                           onRetry={this.props.retryQuiz}
                         />
                         : <ActiveQuiz
                           answers={this.props.quiz[this.props.activeQuestion].answers}
                           question={this.props.quiz[this.props.activeQuestion].question}
                           onAnswerClick={this.props.quizAnswerClick}
                           quizLength={this.props.quiz.length}
                           answerNumber={this.props.activeQuestion + 1}
                           state={this.props.answerState}
                         />
                    }
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)