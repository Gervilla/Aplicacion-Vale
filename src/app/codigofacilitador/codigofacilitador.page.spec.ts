import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodigofacilitadorPage } from './codigofacilitador.page';

describe('CodigofacilitadorPage', () => {
  let component: CodigofacilitadorPage;
  let fixture: ComponentFixture<CodigofacilitadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigofacilitadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodigofacilitadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
