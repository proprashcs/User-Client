import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinnercontentComponent } from './viewinnercontent.component';

describe('ViewinnercontentComponent', () => {
  let component: ViewinnercontentComponent;
  let fixture: ComponentFixture<ViewinnercontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinnercontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinnercontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
