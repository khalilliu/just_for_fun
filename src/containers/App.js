import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import NewQuestionBar from "../components/NewQuestionBar";
import Question from "../components/Question";

import * as actions from "../action/action.js";

class App extends Component {
  render() {
    const { newstate, actions } = this.props;
    console.log(newstate.questions);
    return (
      <div ref="paper" className="container">
        <div className="page-header">
          <h1>问卷发布系统</h1>
        </div>
        <Header
          title={newstate.paper.title}
          setPaperTitle={actions.setPaperTitle}
        />
        <div className="row">
          <NewQuestionBar row="2" addQuestion={actions.addQuestion} />
          <div className="col-md-10">
            <ul className="list-group">
              title={newstate.paper.title}
              {newstate.questions.map((question, i) => {
                return (
                  <Question
                    question={question}
                    questionId={i}
                    key={i}
                    type={question.type}
                    count={newstate.questions.length}
                    changeOrder={actions.changeOrder}
                    setOptionTitle={actions.setOptionTitle}
                    setQuestionTitle={actions.setQuestionTitle}
                    removeQuestion={actions.removeQuestion}
                    addQuestion={actions.addQuestion}
                    removeOption={actions.removeOption}
                    addOption={actions.addOption}
                    modifyQuestion={actions.modifyQuestion}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newstate: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
