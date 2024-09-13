import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCamperonesComponent } from './card-camperones.component';

describe('CardCamperonesComponent', () => {
  let component: CardCamperonesComponent;
  let fixture: ComponentFixture<CardCamperonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCamperonesComponent]
    });
    fixture = TestBed.createComponent(CardCamperonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
