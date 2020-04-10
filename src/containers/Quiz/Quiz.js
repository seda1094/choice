import React, { Component } from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/FinishedQuiz';
class Quiz extends Component {

    state = {
        results: {}, //{[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'seccess' 'error'}
        quiz: [
            {
                id: 1,
                question: 'How are you',
                rightAnswerId: 2,
                answers: [
                    { text: 'Good', id: 1 },
                    { text: 'Fine', id: 2 },
                    { text: 'Bad', id: 3 },
                    { text: ':///', id: 4 },
                ]
            },
            {
                id: 2,
                question: 'What is my name',
                rightAnswerId: 1,
                answers: [
                    { text: 'Seda', id: 1 },
                    { text: 'Aram', id: 2 },
                    { text: 'Alex', id: 3 },
                    { text: 'Nina', id: 4 },
                ]
            },
            {
                id: 3,
                question: 'Where I am',
                rightAnswerId: 4,
                answers: [
                    { text: 'Spain', id: 1 },
                    { text: 'Gyumri', id: 2 },
                    { text: 'Moscow', id: 3 },
                    { text: 'Yerevan', id: 4 },
                ]
            },
            {
                id: 4,
                question: 'Where I am working',
                rightAnswerId: 3,
                answers: [
                    { text: 'Zoom', id: 1 },
                    { text: 'Digitain', id: 2 },
                    { text: 'Tumo', id: 3 },
                    { text: 'PubNative', id: 4 },
                ]
            },
            {
                id: 5,
                question: 'My surname',
                rightAnswerId: 1,
                answers: [
                    { text: 'Hayrapetyan', id: 1 },
                    { text: 'Grigoryan', id: 2 },
                    { text: 'Badalyan', id: 3 },
                    { text: 'Hakobyan', id: 4 },
                ]
            }
        ]
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
        
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
            if(!results[question.id]){
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
            results[question.id]= 'error'
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
    onRetryHandler =() => {
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
                        this.state.isFinished ?
                            <FinishedQuiz 
                            quiz={this.state.quiz} 
                            results={this.state.results}
                            onRetry={this.onRetryHandler}/> :
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