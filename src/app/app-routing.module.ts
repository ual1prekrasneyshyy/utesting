import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TestsComponent} from "./components/tests/tests.component";
import {TestSubjectsComponent} from "./components/test-subjects/test-subjects.component";
import {QuestionAnsweringFormComponent} from "./components/question-answering-form/question-answering-form.component";

const routes: Routes = [
  {path: 'tests', component: TestSubjectsComponent},
  {path: 'test/:testSubjectId', component: TestsComponent},
  {path: 'do/test/:testId', component: QuestionAnsweringFormComponent}
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
