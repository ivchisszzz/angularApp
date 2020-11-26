import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdvertComponent } from './list-advert.component';

describe('ListAdvertComponent', () => {
  let component: ListAdvertComponent;
  let fixture: ComponentFixture<ListAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
