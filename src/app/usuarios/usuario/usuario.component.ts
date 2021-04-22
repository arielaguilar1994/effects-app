import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModel;
  loading: boolean = false;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('usuario').subscribe( ({user, loading, error}) => {
      this.loading = loading;
      this.usuario = user;
    });

    this.router.params.subscribe(({ id })=> {

      this.store.dispatch(cargarUsuario({ id }));

    });
  }

}
