import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplaylistComponent } from './newplaylist.component';

describe('NewplaylistComponent', () => {
  let component: NewplaylistComponent;
  let fixture: ComponentFixture<NewplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
