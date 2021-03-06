import { Component, OnInit } from '@angular/core';
import {TestsService} from "../../services/tests.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Test} from "../../models/test";
import {DoTestService} from "../../services/do-test.service";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  tests: Test[] = [];

  constructor(private doTestService: DoTestService, private testService: TestsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let testSubjectId = params['testSubjectId'];

      this.testService.getAllTestsByTestSubjectId(testSubjectId).subscribe(tests => {
        this.tests = tests;
      }, err => {
        this.tests = [];
      });
    });
  }

  startTest(testId: bigint | undefined): void{

    this.doTestService.startTest(testId).subscribe(test=>{
      this.router.navigate(['do/test', test.sessionId, 0, ]);
    });
  }

}
