import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourneesComponent } from './tournees.component';

describe('TourneesComponent', () => {
  let component: TourneesComponent;
  let fixture: ComponentFixture<TourneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourneesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});