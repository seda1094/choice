import React from 'react';
import './AnswersList.css'
import AnswerItem from './answerItem/AnswerItem';

const AnswersList = props => {
    return ( 
        <ul className="AnswersList">
           {props.answers.map((answer, index)=> {
               return (<AnswerItem 
                onAnswerClick={props.onAnswerClick} 
                answer={answer} 
                key = {index}
                state={props.state ? props.state[answer.id] : null}/>)
           })}
        </ul>
     );
}
 
export default AnswersList;