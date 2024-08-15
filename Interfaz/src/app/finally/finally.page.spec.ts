import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinallyPage } from './finally.page';

describe('FinallyPage', () => {
  let component: FinallyPage;
  let fixture: ComponentFixture<FinallyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinallyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
