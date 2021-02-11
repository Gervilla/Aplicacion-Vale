import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EjercicioPage } from './ejercicio.page';

describe('EjercicioPage', () => {
  let component: EjercicioPage;
  let fixture: ComponentFixture<EjercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EjercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
