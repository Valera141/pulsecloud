import { Component, inject } from '@angular/core';
import { ServicioUsuarios } from '../../services/servicio-usuarios';
import { MatTableModule } from '@angular/material/table';
import { UsuarioDTO } from '../../models/usuarioDTO';
import { RouterLink } from '@angular/router';
import { MatAnchor } from "@angular/material/button";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-usuarios',
  imports: [MatTableModule, RouterLink, MatAnchor, DatePipe],
  templateUrl: './list-usuarios.html',
  styleUrl: './list-usuarios.css',
})
export class ListUsuarios {
  usuariosService = inject(ServicioUsuarios);
  displayedColumns: string[] = ['foto', 'idUsuario', 'nombre', 'apellido', 'correo', 'telefono', 'status', 'acciones'];
  usuariosDataSource!: UsuarioDTO[];

  constructor() {
    setTimeout(() => {
      this.usuariosService.getUsuarios().subscribe(usuarios => {
        this.usuariosDataSource = usuarios;
        console.log(usuarios);
      })
    }, 3000);
  }
}
