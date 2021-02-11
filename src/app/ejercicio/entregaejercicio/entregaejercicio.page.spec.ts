import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntregaejercicioPage } from './entregaejercicio.page';

describe('EntregaejercicioPage', () => {
  let component: EntregaejercicioPage;
  let fixture: ComponentFixture<EntregaejercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaejercicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntregaejercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
