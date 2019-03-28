import React, { Component } from "react";
import cn from "classnames";

import "./App.css";

const addIds = (questions = []) => {
  return questions.map((q, i) => ({ id: i + (q.title || q.text || ""), ...q }));
};

const addMixins = (_questions = []) => {
  const isValid = function() {
    const { value, required, dependsOn } = this;
    if (!!dependsOn && !questions.find(item => item.value === dependsOn)) {
      return true;
    }
    return !required || (required && !!value);
  };
  return _questions.map(q => ({ isValid, ...q }));
};

const isValid = (questions = []) => {
  return questions.every(q => q.isValid());
};

const getAnswers = (questions = []) => {
  return questions
    .filter(
      q =>
        ["input", "radio"].includes(q.type) &&
        ((!!q.dependsOn &&
          questions.find(item => item.value === q.dependsOn) &&
          !!q.value) ||
          (!q.dependsOn && !!q.value))
    )
    .map(q => ({ title: q.title, value: q.value }));
};

const questions = addMixins(
  addIds([
    {
      title: "גיל",
      type: "input",
      value: "",
      required: true
    },
    {
      title: "מין",
      type: "radio",
      questions: addIds([
        {
          text: "זכר"
        },
        {
          text: "נקבה"
        }
      ]),
      value: "",
      required: true
    },
    {
      title: "מגורים",
      type: "radio",
      questions: addIds([
        {
          text: "גר/ה לבד"
        },
        {
          text: "לא גר/ה לבד"
        }
      ]),
      value: "",
      required: true
    },
    {
      title: "נפילות בתוך הבית",
      type: "radio",
      questions: addIds([
        {
          text: "נפילה אחת לחודש, ללא קימה לבד"
        },
        {
          text: "נפילה אחת לשבוע, ללא קימה לבד"
        },
        {
          text: "ללא בעיה"
        }
      ]),
      value: "ללא בעיה",
      required: true
    },
    {
      title: "הלבשה",
      type: "radio",
      questions: addIds([
        {
          text: "צריך/ה עזרה קלה"
        },
        {
          text: "צריך/ה עזרה רבה או מלאה בהלבשה"
        },
        {
          text: "אין בעיה"
        }
      ]),
      value: "אין בעיה",
      required: true
    },
    {
      title: "רחצה",
      type: "radio",
      questions: addIds([
        {
          text: "צריך/ה עזרה קלה בהכנת תנאי הרחצה/השגחה"
        },
        {
          text: "צריך/ה עזרה פעילה בחלק מפעולות הרחצה"
        },
        {
          text: "צריך/ה עזרה ברחיצת אזורים אינטימיים"
        },
        {
          text: "צריך/ה עזרה מלאה בכל פעולות הרחצה"
        },
        {
          text: "מסרב/ת להתרחץ עקב בעיות תובנה. צריך/ה עזרה מלאה"
        },
        {
          text: "אין בעיה"
        }
      ]),
      value: "אין בעיה",
      required: true
    },
    {
      title: "ניוד",
      type: "radio",
      questions: addIds([
        {
          text: "נייד/ת בעזרת מכשיר אבל זקוק לעזרת אדם בהליכה או קימה"
        },
        {
          text: "משתמש/ת בכיסא גלגלים, אך מסתדר/ת לבד בתוך הבית"
        },
        {
          text: "נעזר/ת בכיסא גלגלים וזקוק/ה לעזרה"
        },
        {
          text: "מרותק/ת למיטה, ולא מסוגל/ת ללכת"
        },
        {
          text: "ללא בעיה"
        }
      ]),
      value: "ללא בעיה",
      required: true
    },
    {
      title: "הפרשות",
      type: "radio",
      questions: addIds([
        {
          text: "משתמש בשירותים או בסיר/בקבוק, אבל צריך/ה עזרה מועטה"
        },
        {
          text: "שולט/ת באופן חלקי (הרטבת לילה) ולא מטפל/ת בעצמו/ה"
        },
        {
          text: "משתמש בשירותים או בסיר/בקבוק, אבל צריך/ה עזרה"
        },
        {
          text:
            "ללא שליטה באחד הסוגרים, לא מטפל/ת בעצמו/ה, ותלוי/ה לחלוטין בעזרת הזולת"
        },
        {
          text: "עושה צרכים ללא היגיון, עקב חוסר תובנה"
        },
        {
          text: "אין בעיה"
        }
      ]),
      value: "אין בעיה",
      required: true
    },
    {
      title: "אכילה ושתייה",
      type: "radio",
      questions: addIds([
        {
          text: "צריך/ה עזרה באכילה או לקיחת תרופות"
        },
        {
          text: "צריך/ה עזרה חלקית באכילה או לקיחת תרופות"
        },
        {
          text: "מסרב/ת לאכול וזקוק/ה לעזרה"
        },
        {
          text: "זקוק/ה להאכלה מלאה באמצעות זונדה, פאג וכו'"
        },
        {
          text: "אין בעיה"
        }
      ]),
      value: "אין בעיה",
      required: true
    },
    {
      type: "separator"
    },
    {
      type: "paragraph",
      title: "מבחן הכנסות",
      content:
        'ביטוח לאומי מחשב את הזכאות לגמלת סיעוד גם על בסיס הכנסות. יש לסמן את סכום ההכנסה החודשית במידה ולא מעוניינים למסור את ההכנסה, ניתן לסמן "לא כרגע"'
    },
    {
      title: "יחיד/זוג",
      type: "radio",
      questions: addIds([
        {
          text: "יחיד"
        },
        {
          text: "זוג"
        }
      ]),
      value: "",
      required: false
    },
    {
      title: "יחיד",
      dependsOn: "יחיד",
      type: "radio",
      questions: addIds([
        {
          text: "עד 9,089 ₪*"
        },
        {
          text: "מעל 9,089 ₪ ועד ל- 13,634 ₪"
        },
        {
          text: "מעל 13,634 ₪"
        },
        {
          text: "לא כרגע"
        }
      ]),
      value: "",
      required: true
    },
    {
      title: "זוג",
      dependsOn: "זוג",
      type: "radio",
      questions: addIds([
        {
          text: "עד 13,634 ₪"
        },
        {
          text: "מעל 13,634 ₪ ועד ל- 20,451 ₪"
        },
        {
          text: "מעל 20,451 ₪"
        },
        {
          text: "לא כרגע"
        }
      ]),
      value: "",
      required: true
    }
  ])
);

class Block extends Component {
  onChange = event => {
    const { question = {}, onChange = function() {} } = this.props;
    question.value = event.target.value;
    onChange(question.value);
  };

  onClick = () => {
    const { question = {}, onFocus = function() {} } = this.props;
    const { type } = question;
    if (["input", "radio"].includes(type)) {
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
              value={q.text}
              checked={q.text === value}
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
      console.log("Results: ", getAnswers(questions));
      this.props.onSubmit && this.props.onSubmit();
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
            focused={focusId == q.id}
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

class App extends Component {
  state = { qMode: true };

  render() {
    const { qMode } = this.state;
    return (
      <div className="Page-container">
        {qMode && (
          <div className="Main-container">
            <Questions onSubmit={() => this.setState({ qMode: false })} />
          </div>
        )}
        {!qMode && <SuccessPage />}
      </div>
    );
  }
}

export default App;
