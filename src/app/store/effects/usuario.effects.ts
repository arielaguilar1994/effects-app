import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSucces } from "../actions";
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs'
import { UsuarioService } from "src/app/services/usuario.service";

@Injectable()
export class UsuarioEffects {
    constructor(
        private action$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        () => this.action$.pipe(
            ofType( cargarUsuario ),
            // tap( data => console.log('effect', data) ),//es para saber que informacion me esta devoviendo el effects
            mergeMap(
                ( action ) => this.usuarioService.getUser( action.id )
                        .pipe(
                            // tap(data => console.log('getUsers effect', data))
                            //el effect debe retornar una action
                            map( user => cargarUsuarioSucces({ usuario: user}) ),
                            //se coloca of para que devuelva un observable en el merge map
                            catchError( err => of (cargarUsuarioError( { payload: err })) )
                        )
            )
        )
    );
}