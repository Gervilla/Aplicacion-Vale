import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfofacilitadorPage } from './infofacilitador.page';

describe('InfofacilitadorPage', () => {
  let component: InfofacilitadorPage;
  let fixture: ComponentFixture<InfofacilitadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfofacilitadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfofacilitadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
