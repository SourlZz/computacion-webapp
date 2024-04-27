import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamateriasScreenComponent } from './listamaterias-screen.component';

describe('ListamateriasScreenComponent', () => {
  let component: ListamateriasScreenComponent;
  let fixture: ComponentFixture<ListamateriasScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListamateriasScreenComponent]
    });
    fixture = TestBed.createComponent(ListamateriasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
