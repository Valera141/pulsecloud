import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";
import { UsuarioDTO } from "../models/usuarioDTO";
import { LecturasRitmoDTO } from "../models/lecturasRitmoDTO";

@Injectable({
    providedIn: 'root'
})
export class ServicioUsuarios {
    private http = inject(HttpClient);
    private urlUsuarios = environment.apiURL + "Usuarios";
    private urlLecturasRitmo = environment.apiURL + "Ritmo"

    public getUsuarios(): Observable<UsuarioDTO[]> {
        return this.http.get<UsuarioDTO[]>(this.urlUsuarios + "/MostrarTodos")
    }

    public getUsuario(id: number): Observable<UsuarioDTO> {
        return this.http.get<UsuarioDTO>(this.urlUsuarios + "/Buscar/" + id);
    }

    public getLecturasRitmo(): Observable<LecturasRitmoDTO[]> {
        return this.http.get<LecturasRitmoDTO[]>(this.urlLecturasRitmo)
    }

    public postUsuarios(formData: FormData) {
        return this.http.post(this.urlUsuarios, formData);
    }

    public putUsuarios(id: number, formData: FormData) {
        return this.http.put(this.urlUsuarios + `/${id}`, formData);
    }

    public deleteUsuarios(id: number) {
        return this.http.delete(this.urlUsuarios + `/${id}`);
    }
}