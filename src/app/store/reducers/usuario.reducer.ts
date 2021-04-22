import {createReducer, on} from '@ngrx/store';
import { UsuarioModel } from '../../models/usuario.model';
import { cargarUsuario, cargarUsuarioSucces, cargarUsuarioError } from '../actions';

export interface UsuarioState {
    id: string,
    user: UsuarioModel,
    loaded: boolean,
    loading: boolean,
    error: any
}

const usuarioInitialState: UsuarioState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
}

const _usuarioReducer = createReducer(usuarioInitialState,

    on(cargarUsuario, (state, { id }) => ({
         ...state,
         id: id,
         loading: true
        })),

    on(cargarUsuarioSucces, (state, { usuario })=> ({
        ...state,
        loading: false,
        loaded: true,
        user: { ...usuario }
    })),

    on(cargarUsuarioError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            status: payload.status,
            message: payload.message
        }
    }))

);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}