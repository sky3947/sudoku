import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoNotesModalComponent } from './auto-notes-modal.component';

describe('AutoNotesModalComponent', () => {
  let component: AutoNotesModalComponent;
  let fixture: ComponentFixture<AutoNotesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoNotesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoNotesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
