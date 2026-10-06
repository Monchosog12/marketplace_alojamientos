import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Infoalojamientoscomponent } from './infoalojamientoscomponent';

describe('Infoalojamientoscomponent', () => {
  let component: Infoalojamientoscomponent;
  let fixture: ComponentFixture<Infoalojamientoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Infoalojamientoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Infoalojamientoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
