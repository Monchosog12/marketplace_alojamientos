import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filtrocomponent } from './filtrocomponent';

describe('Filtrocomponent', () => {
  let component: Filtrocomponent;
  let fixture: ComponentFixture<Filtrocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filtrocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Filtrocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
