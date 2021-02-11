import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfopersonaPage } from './infopersona.page';

describe('InfopersonaPage', () => {
  let component: InfopersonaPage;
  let fixture: ComponentFixture<InfopersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfopersonaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfopersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
