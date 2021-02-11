import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonasAsignadasPage } from './personasasignadas.page';

describe('PersonasAsignadasPage', () => {
  let component: PersonasAsignadasPage;
  let fixture: ComponentFixture<PersonasAsignadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasAsignadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonasAsignadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
