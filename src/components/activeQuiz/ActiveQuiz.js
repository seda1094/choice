import React from 'react';
import './ActiveQuiz.css'
import AnswersList from './answersList/AnswersList';

const ActiveQuiz = (props) => {
    return (
        <div className="ActiveQuiz">
            <p className="Question">
                <span>
                    <strong>{props.answerNumber}. </strong>
                    {props.question}
                </span>
                <small>{props.answerNumber} from {props.quizLength}</small>
            </p>
            <AnswersList onAnswerClick={props.onAnswerClick} answers={props.answers} state={props.state}/>
        </div>
    )
}

export default ActiveQuiz