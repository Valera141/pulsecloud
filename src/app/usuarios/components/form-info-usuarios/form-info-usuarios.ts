import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { ServicioUsuarios } from '../../services/servicio-usuarios';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import * as L from 'leaflet';

@Component({
  selector: 'app-form-info-usuarios',
  imports: [
    ReactiveFormsModule,
    BaseChartDirective
  ],
  templateUrl: './form-info-usuarios.html',
  styleUrl: './form-info-usuarios.css',
})
export class FormInfoUsuarios {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private ritmoService = inject(ServicioUsuarios);

  formInfo = this.formBuilder.group({
    nombre: ['', Validators.required],
    correo: ['', Validators.email]
  });

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Ritmo cardiaco',
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  }

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data:[],
        label: 'Temperatura'
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
  };

  ngOnInit() {
    this.cargarLecturas();
    this.initMap();
  }

  initMap(){
    const map = L.map('map').setView([19.818094488683293, -97.36097412806839], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);
  }

  cargarLecturas() {
    this.ritmoService.getLecturasRitmo().subscribe(data => {
      this.lineChartData.labels = data.map(x => new Date(x.fecha).toLocaleTimeString());
      this.lineChartData.datasets[0].data = data.map(x => x.valor);
    });
  }
}
