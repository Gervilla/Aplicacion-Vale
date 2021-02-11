import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaejerciciosPage } from './listaejercicios.page';

describe('ListaejerciciosPage', () => {
  let component: ListaejerciciosPage;
  let fixture: ComponentFixture<ListaejerciciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaejerciciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaejerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
