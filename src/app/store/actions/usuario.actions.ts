import { createAction, props } from '@ngrx/store';
import { UsuarioModel } from 'src/app/models/usuario.model';

export const cargarUsuario = createAction(
    '[Usuario] Cargar Usuario Id',
    props<{ id: string }>()
);

export const cargarUsuarioSucces = createAction(
    '[Usuario] Cargar Usuario Id Success',
    props<{ usuario: UsuarioModel }>()
);

export const cargarUsuarioError = createAction(
    '[Usuario] Cargar Usuario Id Error',
    props<{ payload: any }>()
);