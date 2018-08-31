
import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export default function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}


export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}


export function saveAnswer({ authedUser, qid, answer }) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText,
        }).then((question) => dispatch(addQuestion(question)))
    }
}

export function handleAnswer(info) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      const information = {
        authedUser: authedUser,
        qid: info.id,
        answer: info.option,
      };
      dispatch(saveAnswer(information));
      return saveQuestionAnswer(information)
    };
  }