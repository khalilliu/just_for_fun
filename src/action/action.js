import * as types from "../constants/actionTypes.js";

export function addQuestion(type) {
  return {
    type: types.ADD_QUESTION,
    questionType: type
  };
}

export function setPaperTitle(newTitle) {
  return {
    type: types.SET_PAPER_TITLE,
    value: newTitle
  };
}

export function setQuestionTitle(questionId, newTitle) {
  return {
    type: types.SET_QUESTION_TITLE,
    questionId,
    value: newTitle
  };
}

export function setOptionTitle(questionId, optionId, newTitle) {
  return {
    type: types.SET_OPTION_TITLE,
    questionId,
    optionId,
    value: newTitle
  };
}

export function changeOrder(questionId, dir1, optionId = 0, dir2 = 0) {
  return {
    type: types.CHANGE_ORDER,
    questionId,
    dir1,
    optionId,
    dir2
  };
}

export function modifyQuestion(questionId, options) {
  return {
    type: types.MODIFY_QUESTION,
    questionId,
    options
  };
}

export function addOption(questionId, optionType) {
  return {
    type: types.ADD_OPTION,
    questionId,
    optionType
  };
}

export function removeOption(questionId, optionId) {
  return {
    type: types.REMOVE_OPTION,
    questionId,
    optionId
  };
}

export function removeQuestion(questionId) {
  return {
    type: types.REMOVE_QUESTION,
    questionId
  };
}
