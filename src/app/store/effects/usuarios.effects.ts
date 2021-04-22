import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSucces } from "../actions";
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs'
import { UsuarioService } from "src/app/services/usuario.service";

@Injectable()
export class UsuariosEffects {
    constructor(
        private action$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.action$.pipe(
            ofType( cargarUsuarios ),
            // tap( data => console.log('effect', data) ),//es para saber que informacion me esta devoviendo el effects
            mergeMap(
                () => this.usuarioService.getUsers()
                        .pipe(
                            // tap(data => console.log('getUsers effect', data))
                            //el effect debe retornar una action
                            map( user => cargarUsuariosSucces({ usuarios: user}) ),
                            //se coloca of para que devuelva un observable en el merge map
                            catchError( err => of (cargarUsuariosError( { payload: err })) )
                        )
            )
        )
    );
}