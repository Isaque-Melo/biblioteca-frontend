import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editoras } from './editoras';

describe('Editoras', () => {
  let component: Editoras;
  let fixture: ComponentFixture<Editoras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editoras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editoras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
