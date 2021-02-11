import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenupersonaPage } from './menupersona.page';

describe('MenupersonaPage', () => {
  let component: MenupersonaPage;
  let fixture: ComponentFixture<MenupersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenupersonaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenupersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
