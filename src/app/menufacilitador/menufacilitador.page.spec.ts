import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { MenufacilitadorPage } from "./menufacilitador.page";

describe("MenufacilitadorPage", () => {
  let component: MenufacilitadorPage;
  let fixture: ComponentFixture<MenufacilitadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenufacilitadorPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MenufacilitadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
