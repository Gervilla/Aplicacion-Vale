import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfogrupoPage } from './infogrupo.page';

describe('InfogrupoPage', () => {
  let component: InfogrupoPage;
  let fixture: ComponentFixture<InfogrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfogrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfogrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
