import options from "./options.json";

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
      required: true,
      classNames: ["elementor-column elementor-col-40"]
    },
    {
      title: "מין",
      type: "radio",
      field: "sex",
      questions: addIds(options.sex),
      value: "",
      textValue: "",
      required: true
    },
    {
      title: "מגורים",
      type: "radio",
      field: "host",
      questions: addIds(options.host),
      value: "",
      textValue: "",
      required: true
    },
    {
      title: "נפילות בתוך הבית",
      type: "radio",
      field: "quiz",
      questions: addIds(options.quiz1),
      value: 1,
      textValue: "אין בעיה",
      required: true
    },
    {
      title: "הלבשה",
      type: "radio",
      field: "quiz",
      questions: addIds(options.quiz2),
      value: 1,
      textValue: "אין בעיה",
      required: true
    },
    {
      title: "רחצה",
      type: "radio",
      field: "quiz",
      questions: addIds(options.quiz3),
      value: 1,
      textValue: "אין בעיה",
      required: true
    },
    {
      title: "ניוד",
      type: "radio",
      field: "quiz",
      questions: addIds(options.quiz4),
      value: 1,
      textValue: "אין בעיה",
      required: true
    },
    {
      title: "הפרשות",
      type: "radio",
      field: "quiz",
      questions: addIds(options.quiz5),
      value: 1,
      textValue: "אין בעיה",
      required: true
    },
    {
      title: "אכילה ושתייה",
      type: "radio",
      field: "quiz",
      questions: addIds(options.quiz6),
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
      questions: addIds(options.pair),
      value: "",
      textValue: "",
      required: true
    },
    {
      title: "יחיד",
      dependsOn: "יחיד",
      type: "radio",
      field: "income",
      questions: addIds(options.income1),
      value: "",
      textValue: "",
      required: true
    },
    {
      title: "זוג",
      dependsOn: "זוג",
      type: "radio",
      field: "income",
      questions: addIds(options.income2),
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
      questions: addIds(options.regions),
      value: "",
      textValue: "",
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
  if ((+sex === 1 && age >= 67) || (+sex === 2 && age >= 62)) {
    return 3;
  }
  if (noProblem && +incomeType === 3) {
    return 3;
  }
  if (+incomeType === 2) {
    return 2;
  }
  return 1;
};

export const getAnswers = (questions = []) => {
  return questions
    .filter(
      q =>
        ["input", "radio", "textarea", "dropdown"].includes(q.type) &&
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
