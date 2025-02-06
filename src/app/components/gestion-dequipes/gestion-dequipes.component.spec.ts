import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDequipesComponent } from './gestion-dequipes.component';

describe('GestionDequipesComponent', () => {
  let component: GestionDequipesComponent;
  let fixture: ComponentFixture<GestionDequipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDequipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDequipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
