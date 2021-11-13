import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { TestsComponent } from './components/tests/tests.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { TestSubjectsComponent } from './components/test-subjects/test-subjects.component';
import {CommonModule} from "@angular/common";
import { QuestionAnsweringFormComponent } from './components/question-answering-form/question-answering-form.component';



@NgModule({
  declarations: [
    AppComponent,
    TestsComponent,
    TestSubjectsComponent,
    QuestionAnsweringFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
