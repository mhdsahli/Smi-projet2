import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectriqueComponent } from './electrique.component';

describe('ElectriqueComponent', () => {
  let component: ElectriqueComponent;
  let fixture: ComponentFixture<ElectriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
