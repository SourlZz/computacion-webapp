import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from '../../services/materias.service';

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit {
  public materia: any = {};
  public errors: any = {};
  horaInicial: string = ''; // Variable para almacenar la hora inicial
  horaFinal: string = ''; // Variable para almacenar la hora final

  dias: any[] = [
    {value: 1, nombre: 'Lunes'},
    {value: 2, nombre: 'Martes'},
    {value: 3, nombre: 'Miércoles'},
    {value: 4, nombre: 'Jueves'},
    {value: 5, nombre: 'Viernes'},
    {value: 6, nombre: 'Sábado'}
  ];
  constructor(
    private location: Location,
    private materiasService: MateriasService
  ) { }

  ngOnInit(): void {
    this.materia = this.materiasService.nuevaMateria();
  }

  public checkboxChange(event:any){
    if(event.checked){
      this.materia.dias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materia.dias_json.forEach((dia, i) => {
        if(dia == event.source.value){
          this.materia.dias_json.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.materia);
  }

  revisarSeleccion(nombre: string): boolean {
    return false;
  }
  public regresar(): void {
    this.location.back();
  }

  public registrar(): void {
    // Validar
    this.errors = this.materiasService.validarMateria(this.materia);
    if (Object.keys(this.errors).length !== 0) {
      return;
    }

    // Convertir el array de días a una cadena separada por comas
    this.materia.dias_json = this.materia.dias_json.join(', ');

    // Registrar
    this.materiasService.registrarMateria(this.materia).subscribe(
      (response) => {
        alert("Materia registrada correctamente");
        console.log("Materia registrada: ", response);
        // Redirigir a la página de inicio o a donde sea apropiado
      },
      (error) => {
        alert("No se pudo registrar la materia");
        console.error("Error al registrar la materia: ", error);
      }
    );
}
}
