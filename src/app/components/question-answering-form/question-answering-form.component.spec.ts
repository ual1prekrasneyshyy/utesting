import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnsweringFormComponent } from './question-answering-form.component';

describe('QuestionAnsweringFormComponent', () => {
  let component: QuestionAnsweringFormComponent;
  let fixture: ComponentFixture<QuestionAnsweringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAnsweringFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnsweringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
