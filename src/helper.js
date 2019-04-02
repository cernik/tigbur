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
