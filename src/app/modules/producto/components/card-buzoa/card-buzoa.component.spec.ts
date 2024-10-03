import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBuzoaComponent } from './card-buzoa.component';

describe('CardBuzoaComponent', () => {
  let component: CardBuzoaComponent;
  let fixture: ComponentFixture<CardBuzoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBuzoaComponent]
    });
    fixture = TestBed.createComponent(CardBuzoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
