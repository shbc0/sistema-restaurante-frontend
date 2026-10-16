import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatosList } from './platos-list';

describe('PlatosList', () => {
  let component: PlatosList;
  let fixture: ComponentFixture<PlatosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatosList],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
