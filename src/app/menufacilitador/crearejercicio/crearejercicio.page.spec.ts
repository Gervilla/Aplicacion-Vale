import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearejercicioPage } from './crearejercicio.page';

describe('CrearejercicioPage', () => {
  let component: CrearejercicioPage;
  let fixture: ComponentFixture<CrearejercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearejercicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearejercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
