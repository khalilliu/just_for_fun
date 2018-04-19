import React, { Component } from "react";

class Option extends Component {
  render() {
    let optionType = this.props.optionType;
    switch (optionType) {
      case "radio":
      case "checkbox":
        return (
          <div className="input-group option">
            <span className="input-group-addon">
              <input type={optionType} checked={this.props.checked} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={this.props.holder}
              value={this.props.content}
              onChange={ev => this.setOptionTitle(ev)}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-default"
                type="button"
                disabled={this.props.optionId === 0}
                onClick={() => this.changeOrder(-1)}
              >
                <span className="glyphicon glyphicon-arrow-up">∧</span>
              </button>
              <button
                className="btn btn-default"
                type="button"
                disabled={this.props.optionId === this.props.count - 1}
                onClick={() => this.changeOrder(1)}
              >
                <span className="glyphicon glyphicon-arrow-down">∨</span>
              </button>
              <button
                className="btn btn-default"
                type="button"
                onClick={() =>
                  this.props.removeOption(
                    this.props.questionId,
                    this.props.optionId
                  )
                }
              >
                <span className="glyphicon glyphicon-remove">删除</span>
              </button>
            </span>
          </div>
        );
      case "textarea":
        return (
          <textarea
            className="form-control"
            placeholder="供用户填写"
            row="3"
            readOnly="readOnly"
          />
        );
      default:
        return null;
    }
  }

  changeOrder(dir) {
    this.props.changeOrder(this.props.questionId, 0, this.props.optionId, dir);
  }

  setOptionTitle(e) {
    this.props.setOptionTitle(
      this.props.questionId,
      this.props.optionId,
      e.target.value
    );
  }
}

export default Option;
