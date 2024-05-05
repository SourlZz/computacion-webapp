import { TestBed } from '@angular/core/testing';

import { AdministradoresService } from './administrador.service';

describe('AdministradorService', () => {
  let service: AdministradoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
