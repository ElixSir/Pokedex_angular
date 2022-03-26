import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionTeamComponent } from './connection-team.component';

describe('ConnectionTeamComponent', () => {
  let component: ConnectionTeamComponent;
  let fixture: ComponentFixture<ConnectionTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
