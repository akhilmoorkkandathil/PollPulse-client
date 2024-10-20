import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPollComponent } from './left-poll.component';

describe('LeftPollComponent', () => {
  let component: LeftPollComponent;
  let fixture: ComponentFixture<LeftPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftPollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
