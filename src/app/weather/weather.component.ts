import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../models/weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherData: Weather[] = [];
  loading = true;
  error = '';
  totalRecords = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather(): void {
    this.loading = true;
    this.error = '';

    this.weatherService.getWeather().subscribe({
      next: (data: Weather[]) => {
        this.weatherData = data;
        this.totalRecords = data.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load weather data.';
        this.loading = false;
      }
    });
  }
}