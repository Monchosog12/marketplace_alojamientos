import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Introduccioncomponent } from './introduccioncomponent';

describe('Introduccioncomponent', () => {
  let component: Introduccioncomponent;
  let fixture: ComponentFixture<Introduccioncomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Introduccioncomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Introduccioncomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
