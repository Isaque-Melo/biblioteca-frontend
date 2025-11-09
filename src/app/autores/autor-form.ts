import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutorService } from '../services/autor';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Pais {
  nome: string;
  flagUrl: string;
}

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './autor-form.html',
  styleUrls: ['./autor-form.css'],})
export class AutorFormComponent implements OnInit {


  novoAutor = { nome: '', nacionalidade: '' };
  public listaCompletaPaises: Pais[] = [];
  public listaFiltrada: Pais[] = [];
  public dropdownVisivel = false;


  constructor(
    private autorService: AutorService,
    private router: Router,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.carregarNacionalidades();
  }

  private carregarNacionalidades() {

    this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,flags,translations')
      .pipe(

        map(paises =>
          paises.map(pais => ({
            // Ajuste para pegar o nome em português
            nome: pais.translations.por.common,
            flagUrl: pais.flags.svg

          }))
        ),
        map(paises => paises.sort((a, b) => a.nome.localeCompare(b.nome)))
      )
      .subscribe(
        (dados) => {
          this.listaCompletaPaises = dados;
          this.listaFiltrada = dados;
        },
        (erro) => {
          console.error('Erro ao buscar nacionalidades da API:', erro);
        }
      );
  }

  filtrarLista() {
    if (!this.novoAutor.nacionalidade) {
      this.listaFiltrada = [...this.listaCompletaPaises]; // Mostra tudo se o campo estiver vazio
    } else {
      const termo = this.novoAutor.nacionalidade.toLowerCase();
      this.listaFiltrada = this.listaCompletaPaises.filter(pais =>
        pais.nome.toLowerCase().includes(termo)
      );
    }
    this.dropdownVisivel = true;
  }

  selecionarNacionalidade(pais: Pais) {
    this.novoAutor.nacionalidade = pais.nome; // Preenche o input
    this.dropdownVisivel = false; // Esconde o dropdown
  }

  mostrarDropdown() {
    this.filtrarLista();
  }

  esconderDropdown() {
    setTimeout(() => {
      this.dropdownVisivel = false;
    }, 200);
  }

  onSubmit(form: NgForm) {

      if (form.invalid) {
      return; // Não envia se o formulário for inválido
    }

    this.autorService.criarAutor(this.novoAutor).subscribe(() => {
      this.router.navigate(['/autores']);
    });
  }
}
