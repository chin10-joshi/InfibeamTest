import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import questions from "./../common/questions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  public username = localStorage.getItem('username');
  public testStarted = false;
  public resultDeclared = false;

  public questionList = [];
  subjectForm: FormGroup;
  questionAnswerForm: FormGroup;
  subject: FormControl;
  public selectedSubject = "HTML";
  public correctAnswers = 0;

  public currentQuestion: {
    index: 0,
    question: "",
    options: [],
    answer: "",
    selectedAnswer: ""
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('username')) {
      this.router.navigate(['login']);
    }

    this.subjectForm = new FormGroup({
      subject: new FormControl(this.selectedSubject)
    });
    this.subjectForm.get('subject').valueChanges.subscribe(selectedSubject => {
      this.selectedSubject = selectedSubject;
      this.testStarted = false;
    })
  }

  startTest() {
    this.testStarted = true;
    this.resultDeclared = false;
    let tempQuestions = [];
    switch (this.subjectForm.get('subject').value) {
      case "HTML":
        tempQuestions = questions.HTML;
        break;
      case "CSS":
        tempQuestions = questions.CSS;
        break;
      case "Javascript":
        tempQuestions = questions.Javascript;
        break;
      default:
        tempQuestions = questions.HTML;
        break;
    }
    this.questionList = Object.assign([], tempQuestions);
    this.setTheQuestion(0);
  }

  setTheQuestion(index) {
    this.currentQuestion = {
      index: index,
      question: this.questionList[index].question,
      options: this.questionList[index].options,
      answer: this.questionList[index].correctAnswer,
      selectedAnswer: this.questionList[index].selectedAnswer
    }
  }
  prevQuestion() {
    this.questionList[this.currentQuestion.index].selectedAnswer = this.currentQuestion.selectedAnswer;
    this.setTheQuestion(this.currentQuestion.index - 1);
  }

  nextQuestion() {
    if (this.currentQuestion.selectedAnswer !== "") {
      this.questionList[this.currentQuestion.index].selectedAnswer = this.currentQuestion.selectedAnswer;
      this.setTheQuestion(this.currentQuestion.index + 1);
    }
  }

  onAnswerSelected(event) {
    this.currentQuestion.selectedAnswer = event.target.value;
  }

  cancelTest() {
    this.testStarted = false;
    this.resultDeclared = false;
  }

  showResult() {
    this.questionList[this.currentQuestion.index].selectedAnswer = this.currentQuestion.selectedAnswer;

    this.testStarted = false;
    this.resultDeclared = true;

    this.correctAnswers = this.questionList.filter(item => item.selectedAnswer === item.correctAnswer).length;
  }

  logout() {
    if (localStorage.getItem('username')) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }

}
