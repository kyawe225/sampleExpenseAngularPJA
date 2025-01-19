import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItemCreateComponent } from './expense-item-create.component';

describe('ExpenseItemCreateComponent', () => {
  let component: ExpenseItemCreateComponent;
  let fixture: ComponentFixture<ExpenseItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseItemCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
