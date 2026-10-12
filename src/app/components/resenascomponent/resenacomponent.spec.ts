import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Resenacomponent } from './resenacomponent';

describe('Resenacomponent', () => {
  let component: Resenacomponent;
  let fixture: ComponentFixture<Resenacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resenacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Resenacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
