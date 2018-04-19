import * as types from "../constants/actionTypes";
import _ from "underscore";
import { combineReducers } from "redux";

const initialState = {
  paper: {
    title: "asd",
    time: "2016-09-01",
    author: "Ruiming"
  },
  questions: [
    {
      title: "",
      type: "radio",
      content: ["", "", "", ""],
      fill: true
    },
    {
      title: "",
      type: "checkbox",
      content: ["", "", "", ""],
      fill: true
    }
  ]
};

function questionsReducer(state = initialState.questions, action) {
  let paper = [...state];
  //console.log(paper, 'here');
  switch (action.type) {
    case types.ADD_QUESTION:
      switch (action.questionType) {
        case "radio":
        case "checkbox":
          paper.push({
            title: "",
            type: action.questionType,
            content: ["", "", "", ""],
            fill: true
          });
          return paper;
        case "textarea":
          paper.push({
            title: "",
            type: action.questionType,
            content: [""],
            fill: true
          });
          return paper;
        default:
          return paper;
      }
    case types.REMOVE_QUESTION:
      return _.filter(paper, (value, index) => {
        return index !== action.questionId;
      });
      break;
    case types.MODIFY_QUESTION:
      console.log(action);
      _.map(action.options, (value, key) => {
        return (paper[action.questionId][key] = value);
      });
      if (paper[action.questionId]["max"] < paper[action.questionId]["min"]) {
        paper[action.questionId]["min"] = paper[action.questionId]["max"];
      }
      return paper;
      break;
    case types.ADD_OPTION:
    case types.REMOVE_OPTION:
    case types.SET_QUESTION_TITLE:
    case types.SET_OPTION_TITLE:
      //console.log(action);
      return [
        ...state.slice(0, action.questionId),
        questionReducer(state[action.questionId], action),
        ...state.slice(action.questionId + 1)
      ];
      break;
    // case types.CHANGE_ORDER:
    //   //console.log(action)
    //   console.log(action);
    //   //console.log(paper[action.questionId].content);
    //   return state;
    //   break;

    case types.CHANGE_ORDER:
      if (action.dir2) {
        console.log(paper);
        let options = paper[action.questionId].content;
        let pre = _.extend(options[action.optionId]);
        options[action.optionId] = options[action.optionId + action.dir2];
        options[action.optionId + action.dir2] = pre;
      } else {
        let pre = _.extend(paper[action.questionId]);
        paper[action.questionId] = paper[action.questionId + action.dir1];
        paper[action.questionId + action.dir1] = pre;
      }
      return paper;
    default:
      return state;
  }
}

function paperReducer(state = initialState.paper, action) {
  switch (action.type) {
    case types.SET_PAPER_TITLE:
      return Object.assign({}, state, {
        title: action.value
      });
      break;
    default:
      return state;
  }
}

function questionReducer(state = [], action) {
  let paper = Object.assign({}, state);
  switch (action.type) {
    case types.ADD_OPTION:
      paper.content.push("");
      return paper;
      break;
    case types.REMOVE_OPTION:
      paper.content.splice(action.optionId, 1);
      return paper;
      break;
    case types.SET_QUESTION_TITLE:
      paper.title = action.value;
      return paper;
      break;
    case types.SET_OPTION_TITLE:
      paper.content[action.optionId] = action.value;
      return paper;
      break;
    default:
      return state;
  }
}

const paperApp = combineReducers({
  paper: paperReducer,
  questions: questionsReducer
});

export default paperApp;
