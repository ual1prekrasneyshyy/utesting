import { Component, OnInit } from '@angular/core';
import {TestSubjectsService} from "../../services/test-subjects.service";
import {TestSubject} from "../../models/test.subject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test-subjects',
  templateUrl: './test-subjects.component.html',
  styleUrls: ['./test-subjects.component.css']
})
export class TestSubjectsComponent implements OnInit {

  testSubjects: TestSubject[] = [];

  constructor(private router: Router,private testSubjectsService: TestSubjectsService) { }

  ngOnInit(): void {
    this.testSubjectsService.getAllTestSubjects().subscribe(testSubjects => {
      this.testSubjects = testSubjects;
    }, error => {
      this.testSubjects = [];
    })
  }

  openTest(testSubjectId: bigint | undefined): void{
    this.router.navigate(['test', testSubjectId]);
  }

}
