import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDeleteComponent } from './model-delete.component';

describe('ModelDeleteComponent', () => {
  let component: ModelDeleteComponent;
  let fixture: ComponentFixture<ModelDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
