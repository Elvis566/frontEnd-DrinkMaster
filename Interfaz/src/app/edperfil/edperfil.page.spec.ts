import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdperfilPage } from './edperfil.page';

describe('EdperfilPage', () => {
  let component: EdperfilPage;
  let fixture: ComponentFixture<EdperfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EdperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
