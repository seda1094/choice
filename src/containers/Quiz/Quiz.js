import React, { Component } from 'react';
import './Quiz.css'
import axios from '../../axios/axios-quiz'
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/loader/Loader';
class Quiz extends Component {

    state = {
        results: {}, //{[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'seccess' 'error'}
        quiz: [],
        loading: true
    }
    async componentDidMount() {
        try {
            const res = await axios.get(`/quiz/${this.props.match.params.id}.json`)
            const quiz = res.data
            this.setState({
                quiz,
                loading: false
            })

        } catch (error) {

        }

    }
    onAnswerHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId == answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: { [answerId]: 'success' },
                results: results
            })
            const timeOut = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeOut)
            }, 500)

        }
        else {
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results: results
            })
        }

    }
    isQuizFinished = () => {
        if (this.state.activeQuestion >= this.state.quiz.length - 1) {
            return true
        }
        else {
            return false
        }
    }
    onRetryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: []
        })
    }
    render() {
        return (
            <div className='Quiz'>
                <div className='QuizWrapper'>
                    <h1>Choice 🔥🔥</h1>
                    {
                        this.state.loading ? <Loader />
                        :
                        this.state.isFinished ?
                            <FinishedQuiz
                                quiz={this.state.quiz}
                                results={this.state.results}
                                onRetry={this.onRetryHandler} /> :
                            <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState} />
                    }
                </div>
            </div>
        )
    }
}


export default Quiz