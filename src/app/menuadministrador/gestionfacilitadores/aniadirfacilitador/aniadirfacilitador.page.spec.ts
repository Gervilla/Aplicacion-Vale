import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AniadirfacilitadorPage } from './aniadirfacilitador.page';

describe('AniadirfacilitadorPage', () => {
  let component: AniadirfacilitadorPage;
  let fixture: ComponentFixture<AniadirfacilitadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniadirfacilitadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AniadirfacilitadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
