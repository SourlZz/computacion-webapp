import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from '../../services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit {
  public materia: any = {};
  public errors: any = {};
  horaInicial: string = '';
  horaFinal: string = '';
  dias: any[] = [
    { value: 1, nombre: 'Lunes' },
    { value: 2, nombre: 'Martes' },
    { value: 3, nombre: 'Miercoles' },
    { value: 4, nombre: 'Jueves' },
    { value: 5, nombre: 'Viernes' },
    { value: 6, nombre: 'Sábado' }
  ];

  constructor(
    private location: Location,
    private materiasService: MateriasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idMateria = this.activatedRoute.snapshot.params['id'];
    if (idMateria) {
      this.materiasService.getMateriaByID(idMateria).subscribe(
        (response) => {
          this.materia = response;
          this.dias.forEach(dia => {
            dia.checked = this.materia.dias_json.includes(dia.nombre);
          });
        },
        (error) => {
          alert("No se pudieron obtener los detalles de la materia para editar");
          console.error("Error al obtener los detalles de la materia: ", error);
        }
      );
    }
  }

  public checkboxChange(event: any) {
    // Asegúrate de que this.materia.dias_json sea un array
    if (!Array.isArray(this.materia.dias_json)) {
      this.materia.dias_json = [];
    }

    if (event && event.checked) {
      this.materia.dias_json.push(event.source.value);
    } else if (event) {
      const index = this.materia.dias_json.indexOf(event.source.value);
      if (index !== -1) {
        this.materia.dias_json.splice(index, 1);
      }
    }
    console.log("Array días: ", this.materia.dias_json);
  }

  revisarSeleccion(nombre: string): boolean {
    return this.materia.dias_json ? this.materia.dias_json.includes(nombre) : false;
  }

  public regresar(): void {
    this.location.back();
  }

  public registrar(): void {
    this.errors = this.materiasService.validarMateria(this.materia);
    if (Object.keys(this.errors).length !== 0) {
      return;
    }

    this.materia.dias_json = this.materia.dias_json.join(', ');

    if (this.materia.id) {
      this.materiasService.editarMateria(this.materia).subscribe(
        (response) => {
          alert("Materia actualizada correctamente");
          console.log("Materia actualizada: ", response);
          this.router.navigate(["home"]);
        },
        (error) => {
          alert("No se pudo actualizar la materia");
          console.error("Error al actualizar la materia: ", error);
        }
      );
    } else {
      this.materiasService.registrarMateria(this.materia).subscribe(
        (response) => {
          alert("Materia registrada correctamente");
          console.log("Materia registrada: ", response);
          this.router.navigate(["home"]);
        },
        (error) => {
          alert("No se pudo registrar la materia");
          console.error("Error al registrar la materia: ", error);
        }
      );
    }
  }
}
