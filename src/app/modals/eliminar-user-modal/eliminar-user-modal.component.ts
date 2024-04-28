import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdministradoresService } from '../../services/administrador.service';
import { AlumnosService } from '../../services/alumnos.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';


@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent implements OnInit {
public rol : string = "";
@Input() tipo:string = "";
  constructor(
    private MateriasService: MateriasService,
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    private AdministradoresService: AdministradoresService,
    private AlumnosService: AlumnosService,
    private MaestrosService: MaestrosService,

    @Inject(MAT_DIALOG_DATA) public data: any

  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;

    console.log("Data: ", this.data);
    console.log("Rol: ", this.rol);
  }
  public cerrar_modal(){
    this.dialogRef.close({isDelete: false});
  }
  public eliminarMateria(){
    this.MateriasService.eliminarMateria(this.data.id).subscribe(
      (response)=>{
        console.log("Materia eliminada: ", response);
        this.dialogRef.close({isDelete: true});
      }, (error)=>{
        this.dialogRef.close({isDelete: false});
      }
    );
  }
  public eliminarUser(){
    if(this.rol == 'administrador'){
      this.AdministradoresService.eliminarAdmin(this.data.id).subscribe(
        (response)=>{
          console.log("Admin eliminado: ", response);
          this.dialogRef.close({isDelete: true});
        }, (error)=>{
         this.dialogRef.close({isDelete: false});
        }
      );
    }else if(this.rol == 'alumno'){
      this.AlumnosService.eliminarAlumno(this.data.id).subscribe(
        (response)=>{
          console.log("Alumno eliminado: ", response);
          this.dialogRef.close({isDelete: true});
        }, (error)=>{
          this.dialogRef.close({isDelete: false});
        }
      );
    }else if(this.rol == 'maestro'){
      this.MaestrosService.eliminarMaestro(this.data.id).subscribe(
        (response)=>{
          console.log("Maestro eliminado: ", response);
          this.dialogRef.close({isDelete: true});
        }, (error)=>{
          this.dialogRef.close({isDelete: false});
        }
      );
      //se elimina a la materia
    }

  }

}
