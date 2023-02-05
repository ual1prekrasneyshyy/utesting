import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {TestSubjectsService} from "../../services/test-subjects.service";
import {TestsService} from "../../services/tests.service";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {TestSubject} from "../../models/test.subject";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Test} from "../../models/test";
import {Question} from "../../models/question";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  availableQuestions: Question[] = []

  createTestForm = this.formBuilder.group({
    variant: ['', [Validators.required], [this.isVariantSpare()]],
    testSubject: ['', Validators.required],
    questions: this.formBuilder.array([
      this.formBuilder.control(''),
      this.formBuilder.control(''),
      this.formBuilder.control(''),
      this.formBuilder.control(''),
      this.formBuilder.control('')
      ],
      // this.someQuestionsChosen()
    )
  });


  addQuestionField(){
    this.questions.push(this.formBuilder.control(''))
  }

  testSubjects: TestSubject[] = [];

  constructor(
    private questionsService: QuestionsService,
    private testSubjectsService: TestSubjectsService,
    private testsService: TestsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.testSubjectsService.getAllTestSubjects().subscribe(ts=>{
      this.testSubjects = ts;
    }, err => {
      console.log(err);
      this.testSubjects = [];
    })
  }

  get variant(){
    return this.createTestForm.get('variant');
  }

  get testSubject(){
    return this.createTestForm.get('testSubject');
  }

  get questions(){
    return this.createTestForm.get('questions') as FormArray;
  }

  loadTestSubjectData($event: any) {
    this.availableQuestions = []
    this.questionsService.getAllQuestionsByTestSubjectID(this.testSubject?.value?.id).subscribe(questions=> {
      this.availableQuestions = questions
    })
  }

  isVariantSpare(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null>  => {
      return this.testsService.getTestByVariantAndTestSubjectId(control?.value, this.testSubject?.value?.id).pipe(
        map(
        test => {
          if (test){
            return {variantExistsError: true}
          }
          return null
        }, () => {
          return null
        }
      ))
    }
  }

  submitCreateTestForm() {
    let t: Test = this.createTestForm.value

    this.testsService.addTest(t).subscribe(_ => {
    })

  }

  someQuestionsChosen(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control){
        let forms = control as FormArray

        let counter = 0

        for(let form of forms.controls){
          if (form.get('checked')?.value){
            counter++
          }
        }

        if (counter < 5) {
          return {'atLeastFiveQuestionsShouldBeChosenError': true};
        }

        return null;
      }

      return null;
    }
  }

  deleteQuestion(i: number) {
    this.questions.removeAt(i)
  }
}
