import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreargrupoPage } from './creargrupo.page';

describe('CreargrupoPage', () => {
  let component: CreargrupoPage;
  let fixture: ComponentFixture<CreargrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreargrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreargrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
