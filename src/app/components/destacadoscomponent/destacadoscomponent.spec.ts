import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Destacadoscomponent } from './destacadoscomponent';

describe('Destacadoscomponent', () => {
  let component: Destacadoscomponent;
  let fixture: ComponentFixture<Destacadoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Destacadoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Destacadoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
