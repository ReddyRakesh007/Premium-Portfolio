import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeBackground } from './three-background';

describe('ThreeBackground', () => {
  let component: ThreeBackground;
  let fixture: ComponentFixture<ThreeBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeBackground],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreeBackground);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
