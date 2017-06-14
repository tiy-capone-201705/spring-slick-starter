import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickUserListComponent } from './slick-user-list.component';

describe('SlickUserListComponent', () => {
  let component: SlickUserListComponent;
  let fixture: ComponentFixture<SlickUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlickUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
