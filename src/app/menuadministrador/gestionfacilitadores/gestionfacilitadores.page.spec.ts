import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionfacilitadoresPage } from './gestionfacilitadores.page';

describe('GestionfacilitadoresPage', () => {
  let component: GestionfacilitadoresPage;
  let fixture: ComponentFixture<GestionfacilitadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionfacilitadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionfacilitadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
