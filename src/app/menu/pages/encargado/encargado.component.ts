import { Component, OnInit } from '@angular/core';
import { EncargadoHttpService } from '../../services';
import { IEncargado } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encargado',
  imports: [CommonModule],
  templateUrl: './encargado.component.html',
  styleUrl: './encargado.component.css'
})
export class EncargadoComponent implements OnInit {

  encargadosList: IEncargado[] = []

  constructor(
    private encargadoHttpService: EncargadoHttpService
  ) {


  }

  ngOnInit(): void {
    this.getEncargados()
  }

  getEncargados() {
    this.encargadoHttpService.getEncargadoCategorias().subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.encargadosList = response;
        }
      },
    });
  }

}
