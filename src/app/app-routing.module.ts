import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TestsComponent} from "./components/tests/tests.component";
import {TestSubjectsComponent} from "./components/test-subjects/test-subjects.component";
// import {QuestionAnsweringFormComponent} from "./components/question-answering-form/question-answering-form.component";
import {CreateQuestionComponent} from "./components/create-question/create-question.component";
import {DoTestComponent} from "./components/do-test/do-test.component";
import {CreateTestComponent} from "./components/create-test/create-test.component";

const routes: Routes = [
  {path: 'tests', component: TestSubjectsComponent},
  {path: 'test/:testSubjectId', component: TestsComponent},
  // {path: 'do/test/:sessionId', component: QuestionAnsweringFormComponent},
  {path: 'create/question', component: CreateQuestionComponent},
  {path: 'do/test/:testSessionId/:questionIndex', component: DoTestComponent},
  {path: 'create/test', component: CreateTestComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
