import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DoTestService} from "../../services/do-test.service";
import {DoTest} from "../../models/do.test";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {Question} from "../../models/question";
import {interval, Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";
import {AnswersService} from "../../services/answers.service";
import {FileService} from "../../services/file.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.css']
})
export class DoTestComponent implements OnInit {

  // isAnyQuestionNotAnswered = true;
  imgResource: SafeResourceUrl | null = null;
  doTest = {} as DoTest;
  answerToQuestionForm = this.formBuilder.group({
    answers: this.formBuilder.array([], [Validators.required],
      [this.answerChosenValidator()]
    )
  });
  questionIndex = 0;
  currentQuestion = {} as Question ;
  testSessionId: string = '';

  submitTestAnswersForm = this.formBuilder.group({
    questionsPassed: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private doTestService: DoTestService,
    private router: Router,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.testSessionId = params['testSessionId'];
      this.questionIndex = Number(params['questionIndex']);

      this.doTestService.getTestSessionBySessionId(this.testSessionId).subscribe(doTest => {
        this.doTest = doTest;


          // if(this.questionsPassed.length===0)
        this.questionsPassed.clear();

        this.doTest.questions.forEach(q=> this.questionsPassed.push(this.formBuilder.control(q.passed===1, Validators.requiredTrue)) );

        this.currentQuestion = this.doTest.questions[this.questionIndex];

        if(this.currentQuestion.associatedPictureName){
          this.fileService.viewImage(this.currentQuestion.associatedPictureName).subscribe(data=>{
            // console.log(data);
            this.imgResource = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + data);
          }, err=>{
            console.log(err)
          });
        }

          // if(this.answers.length===0)
        this.answers.clear();

        this.doTest.questions[this.questionIndex].answers?.forEach(a => {
          const control = this.formBuilder.control( a.chosen === 1,
              // Validators.requiredTrue
          );
          this.answers.push( control);

        });

        if(this.currentQuestion?.passed===1) {
          this.disableChooseAnswerCheckBoxes();
            // this.questionsPassed.push(this.formBuilder.control(this.currentQuestion.passed===1, Validators.requiredTrue))
        }


      });
    });


    // interval(1000).subscribe(_=>{
    //   this.isAnyQuestionNotAnswered = false;
    //
    //   this.doTest.questions?.forEach(q=>{
    //     if(q.passed===0){
    //       this.isAnyQuestionNotAnswered = true;
    //     }
    //   });
    // });
  }


  answerChosenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfAnswerChosen().pipe(
        map(res => {
          return res ? null : {'answerNotChosen': true};
          }

        )
      );
    }
  }

  checkIfAnswerChosen(): Observable<boolean>{
    // if(this.currentQuestion?.passed===1) return of(false);

    for(let answer of this.answers.controls){
      if(answer.value)
        return of(true);
    }

    return of(false);
  }

  get answers(){
    return this.answerToQuestionForm.get('answers') as FormArray;
  }

  checkOrUncheckAnswer(index: number){
    if(this.currentQuestion&&this.currentQuestion.answers) {
      let currentAnswer = this.currentQuestion.answers[index];
      currentAnswer.chosen = this.answers.controls[index]?.value ? 1 : 0;
      this.doTestService.registerAnswerChoice(currentAnswer.id, currentAnswer).subscribe();
    }

  }

  submitAnswerToQuestion() {
    if(this.currentQuestion) {
      this.currentQuestion.passed=1;

      let allPossiblePoints = 0.0;
      let gotPoints = 0.0;

      this.currentQuestion.answers?.forEach(a=>{
        if(a.correct===1){
          if(a.chosen===1){
            allPossiblePoints++;
            gotPoints++;
          }else{
            allPossiblePoints++;
          }
        }

        if(a.chosen===1&&a.correct===0){
          allPossiblePoints++;
        }
      });

      this.currentQuestion.points=gotPoints/allPossiblePoints;

      this.doTestService.answerToQuestion(this.currentQuestion.id, this.currentQuestion).subscribe( q => {
        this.questionsPassed.controls[this.questionIndex]?.setValue(q.passed===1);
          // this.router.navigate(['/do/test', this.testSessionId, (this.questionIndex + 1)]);
        this.disableChooseAnswerCheckBoxes();
      });
    }
  }

  disableChooseAnswerCheckBoxes(){
    this.answers.controls.forEach(control=>control.disable());
  }

  // getIndexOfNextQuestion(): number {
  //   return this.questionIndex+1;
  // }
  submitTestAnswers() {
    // this.doTest.passed=1;

    this.doTestService.submitTestAnswers(this.testSessionId, this.doTest).subscribe(dt => {
      this.doTest = dt;

      this.router.navigate(['/do/test', this.testSessionId, -1]);
    });
  }

  get questionsPassed(){
    return this.submitTestAnswersForm.get('questionsPassed') as FormArray;
  }
}
