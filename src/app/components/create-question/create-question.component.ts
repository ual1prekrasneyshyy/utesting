import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {AnswersService} from "../../services/answers.service";
import {Answer} from "../../models/answer";

import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'
import {Question} from "../../models/question";
import {TestSubjectsService} from "../../services/test-subjects.service";
import {TestSubject} from "../../models/test.subject";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  testSubjects: TestSubject[] = [];
  createQuestionForm = this.formBuilder.group({
    value: ['', Validators.required],
    testSubject: ['', Validators.required],
    associatedPictureName: [''],
    answers: this.formBuilder.array(
      [
        this.newAnswerFormGroup(),
        this.newAnswerFormGroup(),
        this.newAnswerFormGroup()
      ],
      [
        Validators.minLength(2),
        Validators.maxLength(8),
        this.isAnyAnswerChosenToBeCorrectValidator()
      ]
    )
  });

  constructor(
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private formBuilder: FormBuilder,
    private testSubjectService: TestSubjectsService,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.testSubjectService.getAllTestSubjects().subscribe(ts => {
      this.testSubjects = ts;
    }, err => {
      this.testSubjects = [];
    });
  }



  newAnswerFormGroup() {
      return this.formBuilder.group({
        value: ['', Validators.required],
        correct: [false],
    });


  }

  deleteAnswer(index: number) {
    this.answers.removeAt(index);
  }

  get answers(){
    return this.createQuestionForm.get('answers') as FormArray;
  }

  get value(){
    return  this.createQuestionForm.get('value');
  }

  get testSubject(){
    return this.createQuestionForm.get('testSubject');
  }

  submitQuestionAddingForm() {
    for(let answerForm of this.answers.controls){
      answerForm.get('correct')?.patchValue(answerForm.get('correct')?.value ? 1 : 0);
    }

    let newQuestion: Question = this.createQuestionForm.value;

    this.questionsService.addQuestion(newQuestion).subscribe();
  }


  addNewAnswerForm() {
    this.answers.push(this.newAnswerFormGroup())
  }



  isAnyAnswerChosenToBeCorrectValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if(control) {
        let forms = control as FormArray;

        for (let form of forms.controls) {
          if (form.get('correct')?.value) return null;
        }

        return {correctAnswerNotChosenError: true}
      }
      return null;
    }
  }


  // changeOrderOfAnswers($event: CdkDragDrop<FormGroup>) {
  //
  // }
  changeOrderOfAnswers($event: CdkDragDrop<FormGroup[]>) {
    this.moveFormGroupsInFormArray(this.answers, $event.previousIndex, $event.currentIndex);
    // moveItemInArray(this.answers.controls, $event.previousIndex, $event.currentIndex)
  }

  moveFormGroupsInFormArray(formArray: FormArray, fromIndex: number, toIndex: number){
    const from = this.clamp(fromIndex, formArray.length);
    const to = this.clamp(toIndex, formArray.length);


    if(from===to){
      return;
    }

    const previousControl = formArray.at(from);
    const currentControl = formArray.at(to);

    formArray.setControl(to, previousControl);
    formArray.setControl(from, currentControl);

  }

  clamp(value: number, maxValue: number): number{
    return Math.max(0, Math.min(value, maxValue));
  }

  handleImageInput(event: any) {
    const photo: File = event.target.files.item(0);
    // console.log(photo);
     this.fileService.uploadImage(photo).subscribe(data=>{
       this.associatedPictureName?.patchValue(data['imageFileName']);
     })
  }

  get associatedPictureName(){
    return this.createQuestionForm.get('associatedPictureName');
  }

}
