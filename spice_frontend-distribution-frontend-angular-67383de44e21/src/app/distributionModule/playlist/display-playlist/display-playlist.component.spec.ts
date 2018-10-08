import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPlaylistComponent } from './display-playlist.component';

describe('DisplayPlaylistComponent', () => {
  let component: DisplayPlaylistComponent;
  let fixture: ComponentFixture<DisplayPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
