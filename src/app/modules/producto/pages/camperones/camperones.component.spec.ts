import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperonesComponent } from './camperones.component';

describe('CamperonesComponent', () => {
  let component: CamperonesComponent;
  let fixture: ComponentFixture<CamperonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamperonesComponent]
    });
    fixture = TestBed.createComponent(CamperonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
