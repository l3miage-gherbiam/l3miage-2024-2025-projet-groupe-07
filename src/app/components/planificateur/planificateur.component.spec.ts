import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificateurComponent } from './planificateur.component';

describe('PlanificateurComponent', () => {
  let component: PlanificateurComponent;
  let fixture: ComponentFixture<PlanificateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
