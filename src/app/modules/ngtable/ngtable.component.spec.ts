import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtableComponent } from './ngtable.component';

describe('NgtableComponent', () => {
  let component: NgtableComponent;
  let fixture: ComponentFixture<NgtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
