import { Routes } from '@angular/router';
import { ListUsuarios } from './usuarios/components/list-usuarios/list-usuarios';
import { FormInfoUsuarios } from './usuarios/components/form-info-usuarios/form-info-usuarios';
import { FormAgregarUsuarios } from './usuarios/components/form-agregar-usuarios/form-agregar-usuarios';
import { FormActualizarUsuarios } from './usuarios/components/form-actualizar-usuarios/form-actualizar-usuarios';
import { FormEliminarUsuarios } from './usuarios/components/form-eliminar-usuarios/form-eliminar-usuarios';
import { FormPortadaUsuarios } from './usuarios/components/form-portada-usuarios/form-portada-usuarios';

export const routes: Routes = [
    { path: '', component: FormPortadaUsuarios},
    { path: 'usuarios', component: ListUsuarios},
    { path: 'usuarios/info/:id', component: FormInfoUsuarios},
    { path: 'usuario/crear', component: FormAgregarUsuarios},
    { path: 'usuario/actualizar/:id', component: FormActualizarUsuarios},
    { path: 'usuario/eliminar/:id', component: FormEliminarUsuarios}
];
