import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService,
    private validatorService: ValidatorService,
    private errorService: ErrorsService
  ) { }

  public nuevaMateria() {
    return {
      'nrc': '',
      'nombre': '',
      'seccion': '',
      'dias_json': [],
      'hora_inicio': '',
      'hora_fin': '',
      'salon': '',
      'programa': ''
    }
  }

  public validarMateria(data: any) {
    let error: any = {};
    console.log("Validando materia... ", data);

    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["nombre"])){
      error["nombre"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["seccion"])){
      error["seccion"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["dias_json"])){
      error["dias_json"] = "Selecciona al menos un días";
      alert("Selecciona al menos un día");
    }

    if(!this.validatorService.required(data["hora_inicio"])){
      error["hora_inicio"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_fin"])){
      error["hora_fin"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["programa"])){
      error["programa"] = this.errorService.required;
    }


    // Agregar más validaciones según sea necesario para otros campos

    return error;
  }

  public registrarMateria(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/materias/`, data, httpOptions);
  }

  public obtenerListaMaterias (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, {headers:headers});
  }
 //Obtener un solo maestro dependiendo su ID
 public getMateriaByID(idUser: Number){
  return this.http.get<any>(`${environment.url_api}/materias/?id=${idUser}`,httpOptions);
}


//Servicio para actualizar un usuario
public editarMateria (data: any): Observable <any>{
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, {headers:headers});
}

//Servicio para eliminar un usuario
public eliminarMateria (idUser: Number): Observable <any>{
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${idUser}`, {headers:headers});
}
  // Agregar más métodos según sea necesario, como obtener la lista de materias, editar una materia, eliminar una materia, etc.
}
