import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoejercicioPage } from './infoejercicio.page';

describe('InfoejercicioPage', () => {
  let component: InfoejercicioPage;
  let fixture: ComponentFixture<InfoejercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoejercicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoejercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
