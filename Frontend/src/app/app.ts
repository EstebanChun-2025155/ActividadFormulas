import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Formula } from './models/formula.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  formulas: Formula[] = [
    {
      id: 1,
      nombre: 'Área de un cuadrado',
      expresion: 'Área = lado × lado',
      campos: ['Lado (m)'],
      unidad: 'm²'
    },
    {
      id: 2,
      nombre: 'Área de un rectángulo',
      expresion: 'Área = base × altura',
      campos: ['Base (m)', 'Altura (m)'],
      unidad: 'm²'
    },
    {
      id: 3,
      nombre: 'Área de un triángulo',
      expresion: 'Área = (base × altura) / 2',
      campos: ['Base (m)', 'Altura (m)'],
      unidad: 'm²'
    },
    {
      id: 4,
      nombre: 'Área de un círculo',
      expresion: 'Área = π × radio²',
      campos: ['Radio (m)'],
      unidad: 'm²'
    },
    {
      id: 5,
      nombre: 'Perímetro de un cuadrado',
      expresion: 'Perímetro = 4 × lado',
      campos: ['Lado (m)'],
      unidad: 'm'
    },
    {
      id: 6,
      nombre: 'Perímetro de un rectángulo',
      expresion: 'Perímetro = 2 × (base + altura)',
      campos: ['Base (m)', 'Altura (m)'],
      unidad: 'm'
    },
    {
      id: 7,
      nombre: 'Rapidez promedio',
      expresion: 'Rapidez = distancia / tiempo',
      campos: ['Distancia (m)', 'Tiempo (s)'],
      unidad: 'm/s'
    },
    {
      id: 8,
      nombre: 'Distancia a rapidez constante',
      expresion: 'Distancia = rapidez × tiempo',
      campos: ['Rapidez (m/s)', 'Tiempo (s)'],
      unidad: 'm'
    },
    {
      id: 9,
      nombre: 'Promedio de tres números',
      expresion: 'Promedio = (a + b + c) / 3',
      campos: ['Primer número', 'Segundo número', 'Tercer número'],
      unidad: ''
    },
    {
      id: 10,
      nombre: 'Porcentaje de una cantidad',
      expresion: 'Resultado = (cantidad × porcentaje) / 100',
      campos: ['Cantidad', 'Porcentaje (%)'],
      unidad: ''
    }
  ];

  formula = this.formulas[0];
  valores: (number | null)[] = [null];
  resultado: number | null = null;
  error = '';

  limpiar(): void {
    this.valores = this.formula.campos.map(() => null);
    this.borrarResultado();
  }

  borrarResultado(): void {
    this.resultado = null;
    this.error = '';
  }

  calcular(): void {
    this.borrarResultado();

    if (this.valores.some(valor => valor === null || !Number.isFinite(valor))) {
      this.error = 'Completa todos los campos con números válidos.';
      return;
    }

    const a = this.valores[0] ?? 0;
    const b = this.valores[1] ?? 0;
    const c = this.valores[2] ?? 0;
    const id = this.formula.id;

    if (id <= 6 && this.valores.some(valor => valor! <= 0)) {
      this.error = 'Las medidas deben ser mayores que cero.';
      return;
    }

    if ((id === 7 || id === 8) && (a < 0 || b < 0)) {
      this.error = 'Los datos físicos no pueden ser negativos.';
      return;
    }

    if (id === 7 && b === 0) {
      this.error = 'El tiempo debe ser mayor que cero.';
      return;
    }

    switch (id) {
      case 1: this.resultado = a * a; break;
      case 2: this.resultado = a * b; break;
      case 3: this.resultado = (a * b) / 2; break;
      case 4: this.resultado = Math.PI * a * a; break;
      case 5: this.resultado = 4 * a; break;
      case 6: this.resultado = 2 * (a + b); break;
      case 7: this.resultado = a / b; break;
      case 8: this.resultado = a * b; break;
      case 9: this.resultado = (a + b + c) / 3; break;
      case 10: this.resultado = (a * b) / 100; break;
    }

    if (this.resultado !== null && !Number.isFinite(this.resultado)) {
      this.resultado = null;
      this.error = 'El resultado es demasiado grande. Usa valores menores.';
    }
  }
}