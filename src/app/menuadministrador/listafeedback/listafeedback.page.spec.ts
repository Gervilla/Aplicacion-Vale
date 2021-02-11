import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListafeedbackPage } from './listafeedback.page';

describe('ListafeedbackPage', () => {
  let component: ListafeedbackPage;
  let fixture: ComponentFixture<ListafeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListafeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListafeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
