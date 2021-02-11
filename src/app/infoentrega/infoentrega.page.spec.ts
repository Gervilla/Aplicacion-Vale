import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoentregaPage } from './infoentrega.page';

describe('InfoentregaPage', () => {
  let component: InfoentregaPage;
  let fixture: ComponentFixture<InfoentregaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoentregaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoentregaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
