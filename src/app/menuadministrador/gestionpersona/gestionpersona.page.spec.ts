import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionpersonaPage } from './gestionpersona.page';

describe('GestionpersonaPage', () => {
  let component: GestionpersonaPage;
  let fixture: ComponentFixture<GestionpersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionpersonaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionpersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
