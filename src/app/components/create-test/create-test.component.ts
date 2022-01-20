import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {TestSubjectsService} from "../../services/test-subjects.service";
import {TestsService} from "../../services/tests.service";
import {FormArray, FormBuilder} from "@angular/forms";
import {TestSubject} from "../../models/test.subject";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  createTestForm = this.formBuilder.group({
    variant: '',
    testSubject: '',
    questions: this.formBuilder.array([])
  });

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

  loadQuestionsByChosenTestSubject($event: any) {
    // console.log(this.testSubject?.value?.subject)

    this.questions.clear();

    // console.log($event.target.value)

    this.questionsService.getAllQuestionsByTestSubjectID(this.testSubject?.value?.id).subscribe(questions=>{
      for(let question of questions){
        this.questions.push(this.formBuilder.control(question.value));
      }
    });
  }
}
