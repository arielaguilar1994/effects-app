import {createReducer, on} from '@ngrx/store';
import { UsuarioModel } from '../../models/usuario.model';
import { cargarUsuarios, cargarUsuariosSucces, cargarUsuariosError } from '../actions';

export interface UsuariosState {
    users: UsuarioModel[],
    loaded: boolean,
    loading: boolean,
    error: any
}

const usuariosInitialState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
}

const _usuariosReducer = createReducer(usuariosInitialState,
    on(cargarUsuarios, state => ({ ...state, loading: true })),

    on(cargarUsuariosSucces, (state, { usuarios })=> ({
        ...state,
        loading: false,
        loaded: true,
        users: [...usuarios]
    })),

    on(cargarUsuariosError, (state, { payload }) => ({
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

export function usuariosReducer(state, action) {
    return _usuariosReducer(state, action);
}