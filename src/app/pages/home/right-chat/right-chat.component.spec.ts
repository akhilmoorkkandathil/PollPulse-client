import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightChatComponent } from './right-chat.component';

describe('RightChatComponent', () => {
  let component: RightChatComponent;
  let fixture: ComponentFixture<RightChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
