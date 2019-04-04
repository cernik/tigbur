import React, { Component } from "react";
import cn from "classnames";

import "./App.css";
import {
  isValid,
  questions,
  questionsSubmit,
  getAnswers,
  getAnswersAndResult,
  getTextResult
} from "./questions";

function getTextValue({ questions, type }, value) {
  if (type !== "radio") {
    return value;
  }
  return (questions.find(x => x.value == value) || {}).text || value;
}

class Block extends Component {
  onChange = event => {
    const { question = {}, onChange = function() {} } = this.props;
    const { value } = event.target;
    question.value = value;
    question.textValue = getTextValue(question, value);
    onChange(question.value);
  };

  onClick = () => {
    const { question = {}, onFocus = function() {} } = this.props;
    const { type } = question;
    if (["input", "radio", "textarea"].includes(type)) {
      onFocus(question.id);
    }
  };

  renderControls() {
    const { question = {} } = this.props;
    const { title, questions, value } = question;

    switch (question.type) {
      case "input": {
        return (
          <input
            className={"Question-input"}
            type={question.fieldType || "text"}
            value={value}
            onChange={this.onChange}
          />
        );
      }
      case "textarea": {
        return (
          <textarea
            className={"Question-input"}
            type="text"
            value={value}
            onChange={this.onChange}
          />
        );
      }
      case "radio": {
        return questions.map(q => (
          <div key={q.id}>
            <input
              type="radio"
              name={title}
              value={q.value}
              checked={q.value == value}
              onChange={this.onChange}
            />
            <label className="Question-text">{q.text}</label>
          </div>
        ));
      }
      case "separator": {
        return <div className="separator" />;
      }
      case "paragraph": {
        return <div className="Paragraph-description">{question.content}</div>;
      }
      case "dropdown": {
        return (
          <select
            id="selectInput"
            className={"Question-input"}
            onChange={this.onChange}
            defaultValue={questions[0].text}
          >
            {questions.map(q => (
              <option key={q.id} value={q.text}>
                {q.text}
              </option>
            ))}
          </select>
        );
      }
      default: {
        return null;
      }
    }
  }

  render() {
    const { question = {}, focused, invalid } = this.props;
    const { title, required, type } = question;

    if (
      !!question.dependsOn &&
      !questions.find(item => item.value === question.dependsOn)
    ) {
      return null;
    }

    let titleClassName = "Block-title";
    if (type === "paragraph") {
      titleClassName = "Block-title-no-bold";
    }
    return (
      <div
        className={cn(
          "Block-container",
          focused && "Focused",
          invalid && "Invalid"
        )}
        onClick={this.onClick}
      >
        <label className={titleClassName}>
          {required && <span className="Required-star">*</span>}
          {title}
        </label>
        {this.renderControls()}
      </div>
    );
  }
}

class ErrorBlock extends Component {
  render() {
    return (
      <div className="Error-container">
        <h3 className="Error-title">{"אירעה בעיה בשליחה שלך."}</h3>
        <p className="Error-description">
          {"השגיאות"}
          <b className="Error-badge">{"הודגשו"}</b>
          {"למטה."}
        </p>
      </div>
    );
  }
}

class Questions extends Component {
  state = { focusId: undefined, showErrors: false };

  onChange = () => {
    this.forceUpdate();
  };

  onFocus = focusId => {
    this.setState({ focusId });
  };

  onSubmit = event => {
    event.preventDefault();
    const valid = isValid(questions);
    this.setState({ showErrors: !valid });

    !valid && window.scrollTo(0, 0);
    if (valid) {
      const results = getAnswersAndResult(questions);
      console.log("Results: ", results);
      this.props.onSubmit && this.props.onSubmit(results);
    }
    return false;
  };

  render() {
    const { focusId, showErrors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="Questions-header-container">
          <h2>מחשבון זכאות</h2>
          <div className="Description">
            מחשבון זכאות לטיפול סיעודי בבית <br />
            בדקו מה הסיכוי לזכאות לגמלת סיעוד מטעם הביטוח הלאומי
          </div>
        </div>
        {showErrors && <ErrorBlock />}
        <section className="Questions-header-description">
          <label>
            נא לשים לב, מחשבון הזכאות נועד לחשב את הסיכוי לקבלת גמלה מביטוח
            לאומי. המחשבון לא מהווה בשום צורה אישור על קבלת זכאות. ביטוח לאומי
            קובע את הזכאות
          </label>
        </section>
        {questions.map(q => (
          <Block
            key={q.id}
            question={q}
            onChange={this.onChange}
            focused={focusId === q.id}
            onFocus={this.onFocus}
            invalid={showErrors && !q.isValid()}
          />
        ))}
        <input type="submit" value={"שלח"} />
      </form>
    );
  }
}

class QuestionsSubmit extends Component {
  state = { focusId: undefined, showErrors: false };

  onChange = () => {
    this.forceUpdate();
  };

  onFocus = focusId => {
    this.setState({ focusId });
  };

  onSubmit = event => {
    event.preventDefault();
    const valid = isValid(questionsSubmit);
    this.setState({ showErrors: !valid });

    !valid && window.scrollTo(0, 0);
    if (valid) {
      const results = getAnswers(questionsSubmit);
      console.log("Results: ", results);
      this.props.onSubmit && this.props.onSubmit(results);
    }
    return false;
  };

  render() {
    const answers = getAnswersAndResult(questions);
    const textResult = getTextResult(answers.result);
    const { focusId, showErrors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="Questions-header-container">
          <label>{textResult}</label>
        </div>
        {questionsSubmit.map(q => (
          <Block
            key={q.id}
            question={q}
            onChange={this.onChange}
            focused={focusId === q.id}
            onFocus={this.onFocus}
            invalid={showErrors && !q.isValid()}
          />
        ))}
        <input type="submit" value={"שלח"} />
      </form>
    );
  }
}

class SuccessPage extends Component {
  render() {
    return (
      <div className="Success-container">
        <h2 className="Success-label">
          {"Great! Thanks for filling out my form"}
        </h2>
      </div>
    );
  }
}

const STAGES = {
  QUESTIONS: "QUESTIONS",
  SUBMIT: "SUBMIT",
  SUCCESS: "SUCCESS"
};

function preparePayloadMessage(
  data = {
    ageAnswer: 0,
    answers: [],
    incomeAnswer: 1,
    quizResult: false,
    result: 0,
    profileAnswers: []
  }
) {
  const profileAnswersStr = data.profileAnswers.reduce(
    (acc, answer) => acc.concat(`${answer.title}: ${answer.textValue}\n`),
    "User:\n"
  );

  const quizAnswersStr = data.answers.reduce(
    (acc, answer) => acc.concat(`${answer.title}: ${answer.textValue}\n`),
    "Answers:\n"
  );

  return `${profileAnswersStr}\n\n${quizAnswersStr}\n\nResult: ${data.result}`;
}

class App extends Component {
  state = {
    mode: STAGES.QUESTIONS,
    results: null
  };

  handleSubmit = e => {
    if (e.mode === STAGES.SUCCESS && this.state.results) {
      const { mode, data: profileAnswers } = e;

      const message = preparePayloadMessage({
        ...this.state.results,
        profileAnswers
      });
      this.setState({ mode });
      if (message) {
        const submittedResults = JSON.stringify({
          type: "react_message",
          data: message
        });
        window.parent.postMessage(submittedResults, "*");
      }
    } else {
      const { mode, data: results } = e;
      console.log("results", results);
      this.setState({ mode, results });
    }
  };

  renderContent() {
    const { mode } = this.state;
    switch (mode) {
      case STAGES.SUBMIT: {
        return (
          <div className="Main-container">
            <QuestionsSubmit
              onSubmit={e =>
                this.handleSubmit({ data: e, mode: STAGES.SUCCESS })
              }
            />
          </div>
        );
      }
      case STAGES.SUCCESS: {
        return <SuccessPage />;
      }
      default:
        return (
          <div className="Main-container">
            <Questions
              onSubmit={e =>
                this.handleSubmit({ data: e, mode: STAGES.SUBMIT })
              }
            />
          </div>
        );
    }
  }
  render() {
    return <div className="Page-container">{this.renderContent()}</div>;
  }
}

export default App;
