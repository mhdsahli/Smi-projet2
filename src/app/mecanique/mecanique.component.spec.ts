import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecaniqueComponent } from './mecanique.component';

describe('MecaniqueComponent', () => {
  let component: MecaniqueComponent;
  let fixture: ComponentFixture<MecaniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecaniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecaniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
