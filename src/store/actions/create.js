import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./actionTypes"
import axios from '../../axios/axios-quiz'


export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}


export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('/quiz.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}