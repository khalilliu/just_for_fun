import React, { Component } from "react";
import Option from "./Option";

class Question extends Component {
  setQuestionTitle(e) {
    let value = e.target.value;
    this.props.setQuestionTitle(this.props.questionId, value);
  }

  changeOrder(dir) {
    this.props.changeOrder(this.props.questionId, dir);
  }

  modifyQuestion(ev, key) {
    let obj = {};
    obj[key] = ev.target.value;
    this.props.modifyQuestion(this.props.questionId, obj);
  }

  render() {
    let part = {
      min: (
        <div className="form-inline">
          <label htmlFor="number">至少选:&nbsp;&nbsp;</label>
          <input
            type="number"
            id="number"
            className="form-control"
            value={this.props.question.min || 2}
            min="2"
            max={this.props.question.max || this.props.question.content.length}
            onChange={(ev, key) => this.modifyQuestion(ev, "min")}
          />
        </div>
      ),

      max: (
        <div className="form-inline">
          <label htmlFor="number">最多选:&nbsp;&nbsp;</label>
          <input
            type="number"
            id="number"
            className="form-control"
            value={
              this.props.question.max || this.props.question.content.length
            }
            min="2"
            max={this.props.question.content.length}
            onChange={(ev, key) => this.modifyQuestion(ev, "max")}
          />
        </div>
      ),

      newOption: (
        <div className="question-manage btn-group-vertical col-xs-2">
          <button
            className="btn btn-default"
            onClick={() =>
              this.props.addOption(this.props.questionId, this.props.optionType)
            }
          >
            新增选项
          </button>
        </div>
      ),

      fill: (
        <label className="checkbox-inline">
          <input
            type="checkbox"
            checked={this.props.question.fill}
            onChange={() =>
              this.props.modifyQuestion(this.props.questionId, {
                fill: !this.props.question.fill
              })
            }
          />
          必填
        </label>
      )
    };

    return (
      <li className="list-group-item row question">
        <div ref="title" className="question-title input-group col-xs-12">
          <input
            type="text"
            placeholder="请输入标题"
            className="form-control"
            value={this.props.question.title}
            onChange={e => this.setQuestionTitle(e)}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="button"
              disabled={this.props.questionId === 0}
              onClick={() => this.changeOrder(-1)}
            >
              <span className="glyphicon glyphicon-arrow-up" />
            </button>
            <button
              className="btn btn-default"
              type="button"
              disabled={this.props.questionId === this.props.count - 1}
              onClick={() => this.changeOrder(1)}
            >
              <span className="glyphicon glyphicon-arrow-down" />
            </button>
            <button
              className="btn btn-default"
              type="button"
              onClick={() => this.props.removeQuestion(this.props.questionId)}
            >
              <span className="glyphicon glyphicon-remove" />
            </button>
          </span>
        </div>
        <div className="options col-xs-10">
          {this.props.question.content.map((subContent, index) => {
            //console.log(index,'dd');
            return (
              <Option
                content={subContent}
                count={this.props.question.content.length}
                optionType={this.props.question.type}
                holder={`选项${index + 1}`}
                checked={false}
                changeOrder={this.props.changeOrder}
                setQuestionTitle={this.props.setQuestionTitle}
                setOptionTitle={this.props.setOptionTitle}
                removeOption={this.props.removeOption}
                questionId={this.props.questionId}
                optionId={index}
                key={index}
              />
            );
          })}
        </div>
        {this.props.type !== "textarea" && part.newOption}
        <div className="option-action form-horizontal col-xs-2">
          {this.props.type === "checkbox" && part.max}
          {this.props.type === "checkbox" && part.min}
          {part.fill}
        </div>
      </li>
    );
  }
}

export default Question;
