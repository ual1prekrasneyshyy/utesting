import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { TestsComponent } from './components/tests/tests.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { TestSubjectsComponent } from './components/test-subjects/test-subjects.component';
import {CommonModule} from "@angular/common";
// import { QuestionAnsweringFormComponent } from './components/question-answering-form/question-answering-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { DoTestComponent } from './components/do-test/do-test.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
// import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    TestsComponent,
    TestSubjectsComponent,
    // QuestionAnsweringFormComponent,
    CreateQuestionComponent,
    DoTestComponent,
    CreateTestComponent,
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule,
      AppRoutingModule,
      CommonModule,
      EditorModule,
      FormsModule,
      ReactiveFormsModule,
      // DragDropModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
