import { Component, inject } from '@angular/core';
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
  selector: 'app-form-agregar-usuarios',
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
  templateUrl: './form-agregar-usuarios.html',
  styleUrl: './form-agregar-usuarios.css',
})
export class FormAgregarUsuarios {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private usuarioService = inject(ServicioUsuarios);

  archivoSeleccionado: File | null = null;

  form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    fechaNacimiento: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    peso: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    altura: ['', [Validators.required, Validators.min(30), Validators.max(300)]],
    status: ['', [Validators.required]],
    ultimoAcceso: ['', [Validators.required]] // ultimoAcceso es manual
  });

  seleccionarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0)
      this.archivoSeleccionado = input.files[0];
  }

  onSubmit(): void {
    if (!this.form.valid)
      return;

    if (!this.archivoSeleccionado) {
      alert("Debe de agregar un archivo");
      return;
    }

    const formValues = this.form.value;
    
    // Obtener la fecha actual en formato YYYY-MM-DD para fechaRegistro
    const fechaActual = new Date().toISOString().split('T')[0];

    const formData = new FormData();
    formData.append("nombre", formValues.nombre!);
    formData.append("apellido", formValues.apellido!);
    formData.append("correo", formValues.correo!);
    formData.append("telefono", formValues.telefono!);
    formData.append("fechaNacimiento", formValues.fechaNacimiento!);
    formData.append("sexo", formValues.sexo!);
    formData.append("peso", formValues.peso!);
    formData.append("altura", formValues.altura!);
    formData.append("status", formValues.status!);
    
    formData.append("fechaRegistro", fechaActual);
    
    formData.append("ultimoAcceso", formValues.ultimoAcceso!);
    
    formData.append("foto", this.archivoSeleccionado!);

    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(key, ':', value);
    });

    this.usuarioService.postUsuarios(formData).subscribe({
      next: () => {
        console.log('Usuario creado exitosamente');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error completo:', error);
        console.error('Status:', error.status);
        console.error('Mensaje:', error.error);
        console.error('Errores detallados:', error.error.errors);
        alert('Error al crear usuario. Revisa la consola para más detalles.');
      }
    });
  }
}