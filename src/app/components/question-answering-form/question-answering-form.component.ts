import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TestsService} from "../../services/tests.service";
import {Test} from "../../models/test";

@Component({
  selector: 'app-question-answering-form',
  templateUrl: './question-answering-form.component.html',
  styleUrls: ['./question-answering-form.component.css']
})
export class QuestionAnsweringFormComponent implements OnInit {

  // test: Test | undefined;

  constructor(private activatedRoute: ActivatedRoute, private testService: TestsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let testId = params['testId'];

      // this.testService.getTestById(testId).subscribe(t => {
      //   // this.test = t;
      // });
    });
  }

}
