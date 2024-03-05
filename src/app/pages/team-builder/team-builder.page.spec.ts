import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamBuilderPage } from './team-builder.page';

describe('TeamBuilderPage', () => {
  let component: TeamBuilderPage;
  let fixture: ComponentFixture<TeamBuilderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TeamBuilderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
