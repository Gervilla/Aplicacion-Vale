import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AniadirpersonaPage } from './aniadirpersona.page';

describe('AniadirpersonaPage', () => {
  let component: AniadirpersonaPage;
  let fixture: ComponentFixture<AniadirpersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniadirpersonaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AniadirpersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
