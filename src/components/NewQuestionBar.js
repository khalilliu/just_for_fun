import React, { Component } from "react";

class NewQuestionBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: [
        { text: "radio", name: "单选题" },
        { text: "checkbox", name: "多选题" },
        { text: "textarea", name: "填空题" }
      ]
    };
  }

  render() {
    return (
      <div className="btn-group-vertical col-md-2 question">
        {this.state.type.map((type, i) => {
          return (
            <a
              href="javascript:;"
              className="btn btn-default"
              key={i}
              onClick={() => this.props.addQuestion(type.text)}
            >
              {type.name}
            </a>
          );
        })}
      </div>
    );
  }
}

export default NewQuestionBar;
