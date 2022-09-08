import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyeditComponent } from './tinyedit.component';

describe('TinyeditComponent', () => {
  let component: TinyeditComponent;
  let fixture: ComponentFixture<TinyeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinyeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
