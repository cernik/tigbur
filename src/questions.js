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

export const isValid = (questions = []) => {
  return questions.every(q => q.isValid());
};

export const questions = addMixins(
  addIds([
    {
      title: "גיל",
      type: "input",
      field: "age",
      value: "",
      textValue: "",
      fieldType: "number",
      required: true
    },
    {
      title: "מין",
      type: "radio",
      field: "sex",
      questions: addIds([
        {
          value: 1,
          text: "זכר"
        },
        {
          value: 2,
          text: "נקבה"
        }
      ]),
      value: "",
      textValue: "",
      required: true
    },
    {
      title: "מגורים",
      type: "radio",
      field: "host",
      questions: addIds([
        {
          value: 1,
          text: "גר/ה לבד"
        },
        {
          value: 2,
          text: "לא גר/ה לבד"
        }
      ]),
      value: "",
      textValue: "",
      required: true
    },
    {
      title: "נפילות בתוך הבית",
      type: "radio",
      field: "quiz",
      questions: addIds([
        {
          value: 2,
          text: "נפילה אחת לחודש, ללא קימה לבד"
        },
        {
          value: 3,
          text: "נפילה אחת לשבוע, ללא קימה לבד"
        },
        {
          value: 1,
          text: "ללא בעיה"
        }
      ]),
      value: 1,
      textValue: "ללא בעיה",
      required: true
    },
    {
      title: "הלבשה",
      type: "radio",
      field: "quiz",
      questions: addIds([
        {
          value: 2,
          text: "צריך/ה עזרה קלה"
        },
        {
          value: 3,
          text: "צריך/ה עזרה רבה או מלאה בהלבשה"
        },
        {
          value: 1,
          text: "אין בעיה"
        }
      ]),
      value: 1,
      textValue: "אין בעיה",
      required: true
    },
    {
      title: "רחצה",
      type: "radio",
      field: "quiz",
      questions: addIds([
        {
          value: 2,
          text: "צריך/ה עזרה קלה בהכנת תנאי הרחצה/השגחה"
        },
        {
          value: 3,
          text: "צריך/ה עזרה פעילה בחלק מפעולות הרחצה"
        },
        {
          value: 4,
          text: "צריך/ה עזרה ברחיצת אזורים אינטימיים"
        },
        {
          value: 5,
          text: "צריך/ה עזרה מלאה בכל פעולות הרחצה"
        },
        {
          value: 6,
          text: "מסרב/ת להתרחץ עקב בעיות תובנה. צריך/ה עזרה מלאה"
        },
        {
          value: 1,
          text: "אין בעיה"
        }
      ]),
      value: 1,
      textValue: "אין בעיה",
      required: true
    },
    {
      title: "ניוד",
      type: "radio",
      field: "quiz",
      questions: addIds([
        {
          value: 2,
          text: "נייד/ת בעזרת מכשיר אבל זקוק לעזרת אדם בהליכה או קימה"
        },
        {
          value: 3,
          text: "משתמש/ת בכיסא גלגלים, אך מסתדר/ת לבד בתוך הבית"
        },
        {
          value: 4,
          text: "נעזר/ת בכיסא גלגלים וזקוק/ה לעזרה"
        },
        {
          value: 5,
          text: "מרותק/ת למיטה, ולא מסוגל/ת ללכת"
        },
        {
          value: 1,
          text: "ללא בעיה"
        }
      ]),
      value: 1,
      required: true
    },
    {
      title: "הפרשות",
      type: "radio",
      field: "quiz",
      questions: addIds([
        {
          value: 2,
          text: "משתמש בשירותים או בסיר/בקבוק, אבל צריך/ה עזרה מועטה"
        },
        {
          value: 3,
          text: "שולט/ת באופן חלקי (הרטבת לילה) ולא מטפל/ת בעצמו/ה"
        },
        {
          value: 4,
          text: "משתמש בשירותים או בסיר/בקבוק, אבל צריך/ה עזרה"
        },
        {
          value: 5,
          text:
            "ללא שליטה באחד הסוגרים, לא מטפל/ת בעצמו/ה, ותלוי/ה לחלוטין בעזרת הזולת"
        },
        {
          value: 6,
          text: "עושה צרכים ללא היגיון, עקב חוסר תובנה"
        },
        {
          value: 1,
          text: "אין בעיה"
        }
      ]),
      value: 1,
      textValue: "אין בעיה",
      required: true
    },
    {
      title: "אכילה ושתייה",
      type: "radio",
      field: "quiz",
      questions: addIds([
        {
          value: 2,
          text: "צריך/ה עזרה באכילה או לקיחת תרופות"
        },
        {
          value: 3,
          text: "צריך/ה עזרה חלקית באכילה או לקיחת תרופות"
        },
        {
          value: 4,
          text: "מסרב/ת לאכול וזקוק/ה לעזרה"
        },
        {
          value: 5,
          text: "זקוק/ה להאכלה מלאה באמצעות זונדה, פאג וכו'"
        },
        {
          value: 1,
          text: "אין בעיה"
        }
      ]),
      value: 1,
      textValue: "אין בעיה",
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
      field: "pair",
      questions: addIds([
        {
          value: "יחיד",
          text: "יחיד"
        },
        {
          value: "זוג",
          text: "זוג"
        }
      ]),
      value: "",
      textValue: "",
      required: true
    },
    {
      title: "יחיד",
      dependsOn: "יחיד",
      type: "radio",
      field: "income",
      questions: addIds([
        {
          value: 1,
          text: "עד 9,089 ₪*"
        },
        {
          value: 2,
          text: "מעל 9,089 ₪ ועד ל- 13,634 ₪"
        },
        {
          value: 3,
          text: "מעל 13,634 ₪"
        },
        {
          value: 4,
          text: "לא כרגע"
        }
      ]),
      value: "",
      textValue: "",
      required: true
    },
    {
      title: "זוג",
      dependsOn: "זוג",
      type: "radio",
      field: "income",
      questions: addIds([
        {
          value: 1,
          text: "עד 13,634 ₪"
        },
        {
          value: 2,
          text: "מעל 13,634 ₪ ועד ל- 20,451 ₪"
        },
        {
          value: 3,
          text: "מעל 20,451 ₪"
        },
        {
          value: 4,
          text: "לא כרגע"
        }
      ]),
      value: "",
      textValue: "",
      required: true
    }
  ])
);

export const questionsSubmit = addMixins(
  addIds([
    {
      title: "שם מלא",
      type: "input",
      value: "",
      textValue: "",
      field: "name",
      required: true
    },
    {
      title: "טלפון",
      type: "input",
      value: "",
      textValue: "",
      field: "phone",
      required: true
    },
    {
      title: "מייל",
      type: "input",
      value: "",
      textValue: "",
      field: "email",
      required: false,
      fieldType: "email"
    },
    {
      title: "אזור",
      type: "dropdown",
      field: "region",
      questions: addIds([
        {
          text: "איזור המרכז – גוש דן"
        },
        {
          text: "איזור ירושלים"
        },
        {
          text: "איזור באר שבע והדרום"
        },
        {
          text: "איזור חיפה והצפון"
        },
        {
          text: "איזור השרון"
        },
        {
          text: "איזור ראשון רחובות"
        },
        {
          text: "אשדוד וצפון הנגב"
        },
        {
          text: "אילת והסביבה"
        },
        {
          text: "טבריה והגליל המיזרחי"
        },
        {
          text: "עפולה והעמקים"
        }
      ]),
      value: "איזור המרכז – גוש דן",
      textValue: "איזור המרכז – גוש דן",
      required: false
    },
    {
      title: "עיר",
      type: "input",
      value: "",
      textValue: "",
      field: "city",
      required: false
    },
    {
      title: "הערות",
      type: "textarea",
      value: "",
      textValue: "",
      field: "comments",
      required: false
    }
  ])
);

const getResult = sex => age => noProblem => incomeType => {
  if ((sex == 1 && age >= 67) || (sex == 2 && age >= 62)) {
    return 3;
  }
  if (noProblem && incomeType == 3) {
    return 3;
  }
  if (incomeType == 2) {
    return 2;
  }
  return 1;
};

export const getAnswers = (questions = []) => {
  return questions
    .filter(
      q =>
        ["input", "radio", "textarea"].includes(q.type) &&
        ((!!q.dependsOn &&
          questions.find(item => item.value === q.dependsOn) &&
          !!q.value) ||
          (!q.dependsOn && !!q.value))
    )
    .map(q => ({
      id: q.id,
      field: q.field,
      title: q.title,
      value: q.value,
      textValue: q.textValue
    }));
};

export function getAnswersAndResult(questions) {
  const answers = getAnswers(questions);
  const quizAnswers = answers.filter(x => x.field === "quiz");
  const ageAnswer = (answers.find(x => x.field === "age") || {}).value || 0;
  const sexAnswer = (answers.find(x => x.field === "sex") || {}).value || 0;
  const quizResult =
    quizAnswers.reduce((acc, x) => acc + +x.value, 0) === quizAnswers.length;

  const incomeAnswer =
    (answers.find(x => x.field === "income") || {}).value || 0;

  const result = getResult(sexAnswer)(ageAnswer)(quizResult)(incomeAnswer);
  return {
    answers,
    ageAnswer,
    quizResult,
    incomeAnswer,
    result
  };
}

export function getTextResult(type) {
  switch (+type) {
    case 1:
      return 'תודה על מילוי הטופס. ע"פ הנתונים שהוזנו יתכן כי תקבלו גמלת סיעוד של ביטוח לאומי בגובה 9.75 שעות שבועיות. על מנת שנוכל לעזור לכם במיצוי זכויותיכם אנא צרו קשר עם תיגבור בטלפון 077-2370003 או השאירו פרטים';
    case 2:
      return 'תודה על מילוי הטופס. ע"פ הנתונים שהוזנו יתכן כי תקבלו גמלת סיעוד של ביטוח לאומי בגובה 5 שעות שבועיות. על מנת שנוכל לעזור לכם במיצוי זכויותיכם אנא צרו קשר עם תיגבור בטלפון 077-2370003 או השאירו פרטים';
    default:
      return 'תודה על מילוי הטופס. ע"פ הנתונים שהוזנו רמת ההכנסה גבוהה ואינה מזכה בגמלת סיעוד. על מנת לבדוק מהן זכויותיך אנא צרו קשר עם תיגבור בטלפון 077-2370003 או השאירו פרטים';
  }
}
