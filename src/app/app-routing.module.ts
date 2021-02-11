import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'codigo',
    loadChildren: () => import('./codigo/codigo.module').then( m => m.CodigoPageModule)
  },
  {
    path: 'menupersona',
    loadChildren: () => import('./menupersona/menupersona.module').then( m => m.MenupersonaPageModule)
  },
  {
    path: 'fecha',
    loadChildren: () => import('./menupersona/fecha/fecha.module').then( m => m.FechaPageModule)
  },
  {
    path: 'menufacilitador',
    loadChildren: () => import('./menufacilitador/menufacilitador.module').then( m => m.MenufacilitadorPageModule)
  },
  {
    path: 'menuadministrador',
    loadChildren: () => import('./menuadministrador/menuadministrador.module').then( m => m.MenuadministradorPageModule)
  },
  {
    path: 'grupos',
    loadChildren: () => import('./grupos/grupos.module').then( m => m.GruposPageModule)
  },
  {
    path: 'creargrupo/:idGrupo',
    loadChildren: () => import('./grupos/creargrupo/creargrupo.module').then( m => m.CreargrupoPageModule)
  },
  {
    path: 'codigofacilitador',
    loadChildren: () => import('./codigofacilitador/codigofacilitador.module').then( m => m.CodigofacilitadorPageModule)
  },
  {
    path: 'gestionfacilitador',
    loadChildren: () => import('./menuadministrador/gestionfacilitadores/gestionfacilitadores.module').then( m => m.GestionfacilitadoresPageModule)
  },
  {
    path: 'aniadirfacilitador/:idFacilitador',
    loadChildren: () => import('./menuadministrador/gestionfacilitadores/aniadirfacilitador/aniadirfacilitador.module').then( m  =>m.AniadirfacilitadorPageModule)
  },
  {
    path: 'gestionpersona',
    loadChildren: () => import('./menuadministrador/gestionpersona/gestionpersona.module').then( m => m.GestionpersonaPageModule)
  },
  {
    path: 'aniadirpersona/:idPersona',
    loadChildren: () => import('./menuadministrador/gestionpersona/aniadirpersona/aniadirpersona.module').then( m  =>m.AniadirpersonaPageModule)
  },
  {
    path: 'ejercicios/:fecha',
    loadChildren: () => import('./menupersona/ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  },
  {
    path: 'personasasignadas',
    loadChildren: () => import('./menufacilitador/personasasignadas/personasasignadas.module').then( m => m.PersonasAsignadasPageModule)
  },
  {
    path: 'crearejercicio/:idEjercicio',
    loadChildren: () => import('./menufacilitador/crearejercicio/crearejercicio.module').then( m => m.CrearejercicioPageModule)
  },
  {
    path: 'infopersona/:idPersona',
    loadChildren: () => import('./infopersona/infopersona.module').then( m => m.InfopersonaPageModule)
  },
  {
    path: 'infofacilitador/:idFacilitador',
    loadChildren: () => import('./infofacilitador/infofacilitador.module').then( m => m.InfofacilitadorPageModule)
  },
  {
    path: 'infogrupo/:idGrupo',
    loadChildren: () => import('./grupos/infogrupo/infogrupo.module').then( m => m.InfogrupoPageModule)
  },
  {
    path: 'ejercicio/:idEjercicio',
    loadChildren: () => import('./ejercicio/ejercicio.module').then( m => m.EjercicioPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'listaejercicios',
    loadChildren: () => import('./menufacilitador/listaejercicios/listaejercicios.module').then( m => m.ListaejerciciosPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'listafeedback',
    loadChildren: () => import('./menuadministrador/listafeedback/listafeedback.module').then( m => m.ListafeedbackPageModule)
  },
  {
    path: 'infofeedback/:idFeedback',
    loadChildren: () => import('./menuadministrador/listafeedback/infofeedback/infofeedback.module').then( m => m.InfofeedbackPageModule)
  },
  {
    path: 'infoejercicio/:idEjercicio',
    loadChildren: () => import('./infoejercicio/infoejercicio.module').then( m => m.InfoejercicioPageModule)
  },
  {
    path: 'entregaejercicio/:idEjercicio',
    loadChildren: () => import('./ejercicio/entregaejercicio/entregaejercicio.module').then( m => m.EntregaejercicioPageModule)
  },
  {
    path: 'infoentrega/:idEntrega',
    loadChildren: () => import('./infoentrega/infoentrega.module').then( m => m.InfoentregaPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
