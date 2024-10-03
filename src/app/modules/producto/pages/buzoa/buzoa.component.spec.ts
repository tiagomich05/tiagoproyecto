import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzoaComponent } from './buzoa.component';

describe('BuzoaComponent', () => {
  let component: BuzoaComponent;
  let fixture: ComponentFixture<BuzoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuzoaComponent]
    });
    fixture = TestBed.createComponent(BuzoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
