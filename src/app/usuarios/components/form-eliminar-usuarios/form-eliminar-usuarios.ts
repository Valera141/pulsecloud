import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { ServicioUsuarios } from '../../services/servicio-usuarios';
import { UsuarioDTO } from '../../models/usuarioDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-eliminar-usuarios',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    RouterLink,
    MatAnchor
  ],
  templateUrl: './form-eliminar-usuarios.html',
  styleUrl: './form-eliminar-usuarios.css',
})
export class FormEliminarUsuarios implements OnInit {
  @Input()
  id!: string;

  private router = inject(Router);
  private usuarioService = inject(ServicioUsuarios);
  private formBuilder = inject(FormBuilder);
  private usuario!: UsuarioDTO;

  ngOnInit(): void {
    this.usuarioService.getUsuario(Number(this.id)).subscribe(usuario => {
      this.usuario = usuario;
      this.form.patchValue(this.usuario);
      console.log(usuario);
    });
  }

  form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
  });

  onSubmit(): void {
    this.usuarioService.deleteUsuarios(Number(this.id)).subscribe(() => {
      this.router.navigate(['/']);
      alert("Eliminado");
    });
  }
}