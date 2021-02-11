import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuadministradorPage } from './menuadministrador.page';

describe('MenuadministradorPage', () => {
  let component: MenuadministradorPage;
  let fixture: ComponentFixture<MenuadministradorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuadministradorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuadministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
