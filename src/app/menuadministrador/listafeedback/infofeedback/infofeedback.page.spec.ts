import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfofeedbackPage } from './infofeedback.page';

describe('InfofeedbackPage', () => {
  let component: InfofeedbackPage;
  let fixture: ComponentFixture<InfofeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfofeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfofeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
