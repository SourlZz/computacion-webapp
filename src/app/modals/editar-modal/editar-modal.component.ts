import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.scss']
})
export class EditarModalComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef< EditarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  //Si no se quiere eliminar entonces se cierra el modal y se regresa a la vista home
  public cerrar_modal(){
    this.dialogRef.close({isDeleted: false});
    //No se si aqui se regresa o no
    this.router.navigate(['/home']);
  }
  //Si se quiere modificar entonces se llama al servicio de materias
  public modificarMat(){
    //Que regrese a la funcion de actualizar de registro-materias.component.ts
    this.dialogRef.close({isDeleted: false});
  }
}
