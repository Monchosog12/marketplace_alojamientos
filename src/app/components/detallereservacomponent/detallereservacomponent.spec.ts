import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Detallereservacomponent } from './detallereservacomponent';

describe('Detallereservacomponent', () => {
  let component: Detallereservacomponent;
  let fixture: ComponentFixture<Detallereservacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Detallereservacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Detallereservacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
