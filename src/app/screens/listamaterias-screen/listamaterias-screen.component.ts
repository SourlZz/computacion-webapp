import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './listamaterias-screen.component.html',
  styleUrls: ['./listamaterias-screen.component.scss']
})
export class ListaMateriasScreenComponent implements OnInit {

  public name_user: string = "";
  public rol: string = "";
  public token: string = "";
  public lista_materias: any[] = [];

  // Para la tabla
  displayedColumns: string[] = ['nrc', 'nombre', 'seccion', 'dias_json', 'hora_inicio', 'hora_fin', 'salon', 'programa', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<any>(this.lista_materias);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private materiasService: MateriasService,
    private router: Router,
    public dialog: MatDialog,
    private facadeService:FacadeService
  ) { }

  ngOnInit(): void {
    // Obtener el nombre del usuario y el rol
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();

    // Validar que haya inicio de sesión
    // Obtener el token del login
    this.token = "Token"; // Aquí debes obtener el token del usuario

    if (this.token == "") {
      this.router.navigate([""]);
    }

    // Obtener materias
    this.obtenerMaterias();

    // Inicializar paginador
    this.initPaginator();
  }

  // Inicializar paginador
  public initPaginator() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      // Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    }, 500);
  }

  // Obtener materias
  public obtenerMaterias() {
    this.materiasService.obtenerListaMaterias().subscribe(
      (response) => {
        this.lista_materias = response;
        if (this.lista_materias.length > 0) {
          this.dataSource = new MatTableDataSource<any>(this.lista_materias);
        }
      }, (error) => {
        alert("No se pudo obtener la lista de materias");
      }
    );
  }

  // Función para editar
  public goEditar(idMateria: number) {
    this.router.navigate(["registro-materias", idMateria]);
  }

  // Eliminar materia
  public delete(idMateria: number) {
    const dialogRef = this.dialog.open(EliminarUserModalComponent, {
      data: { id: idMateria },
      height: '288px',
      width: '328px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.isDelete) {
        // Recargar la página
        window.location.reload();
      } else {
        alert("No se pudo eliminar la materia");
      }
    });
  }
}

export interface DatosMateria {
  id: number;
  nrc: number;
  nombre: string;
  seccion: string;
  dias_json: string;
  hora_inicio: string;
  hora_fin: string;
  salon: string;
  programa: string;
}
