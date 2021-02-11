import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

//Interface
export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  codigo: string;
  foto: string;
  idFacilitadores: Array<number>;
}

export interface Facilitador {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  foto: string;
}

export interface Administrador {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
}

export interface Grupo {
  id: number;
  nombre: string;
  idFacilitador: number;
  idPersonas: Array<number>;
}

export interface Ejercicio {
  id: number;
  idFacilitador: number;
  idGrupo: number;
  idPersonas: Array<number>;
  borrador: boolean;
  nombre: string;
  enunciado: string;
  fechaInicio: string;
  fechaFinal: string;
  foto: string;
  video: string;
  audio: string;
}

export interface Entrega {
  id: number;
  idEjercicio: number;
  idPersona: number;
  fechaEntrega: string;
  respuesta: string;
  video: string;
  audio: string;
}

export interface FeedbackGeneral {
  id: number;
  satisfaccion: number;
  idPersona: number;
  audio: string;
  video: string;
  comentario: string;
}

const PERSONA_KEY = "personas";
const ADMINISTRADOR_KEY = "administradores";
const FACILITADOR_KEY = "facilitadores";
const GRUPO_KEY = "grupos";
const EJERCICIOS_KEY = "ejercicios";
const ENTREGA_KEY = "entrega";
const FEEDBACKGENERAL_KEY = "feedback";

const N_PERSONA_KEY = "_npersonas";
const N_FACILITADOR_KEY = "_nfacilitadores";
const N_GRUPO_KEY = "_ngrupos";
const N_EJERCICIOS_KEY = "_nejercicios";
const N_FEEDBACKGENERAL_KEY = "_nfeedback";
const N_ENTREGA_KEY = "_nentrega";

const ACTIVEUSER_KEY = "usuario_activo";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  authenticationState = new BehaviorSubject(false);
  database;

  constructor(
    private storage: Storage,
    private firebase: AngularFireDatabase,
    private firestorage: AngularFireStorage
  ) {
    this.database = this.firebase.database;
  }

  async getFileFromStorage(path) {
    return new Promise((resolve) => {
      this.firestorage
        .ref(path)
        .getDownloadURL()
        .subscribe((url) => {
          resolve(url);
        });
    });
  }
  async uploadFileToStorage(blob: Blob, path) {
    return this.firestorage
      .ref(path)
      .put(blob)
      .then(function (snapshot) {
        return snapshot;
      });
  }

  async getFromDatabase(path) {
    let snapshot = await this.database.ref("/" + path + "/").get();
    return snapshot.val();
  }
  setInDatabase(path, value) {
    return this.database.ref("/" + path).set(value);
  }

  /////////////////////////////////////PERSONA/////////////////////////////////////
  //Usuario

  getUsuarioActivo() {
    return this.storage.get(ACTIVEUSER_KEY);
  }

  logout() {
    return this.storage.remove(ACTIVEUSER_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  //Metodos de Personas

  async addPersona(persona: Persona, profilePic): Promise<any> {
    let nextID = await this.getFromDatabase(N_PERSONA_KEY);

    let personas = await this.getFromDatabase(PERSONA_KEY);
    if (personas) {
      persona["id"] = nextID;
      for (let i of personas) {
        if (i.codigo == persona.codigo) {
          return false;
        }
      }
      if (profilePic) {
        persona.foto = profilePic.name.substring(
          profilePic.name.lastIndexOf(".") + 1,
          profilePic.length
        );
        await this.uploadFileToStorage(
          profilePic,
          "Personas/" + persona.id + "_profile_pic." + persona.foto
        );
      }
      personas.push(persona);
      await this.setInDatabase(PERSONA_KEY, personas);
      await this.setInDatabase(N_PERSONA_KEY, persona.id + 1);
    }
    return true;
  }

  async editPersona(id: number, persona: Persona, profilePic): Promise<any> {
    let personas = await this.getFromDatabase(PERSONA_KEY);
    if (personas) {
      var index;
      persona["id"] = id;
      for (let i = 0; i < personas.length; ++i) {
        if (personas[i].id == id) index = i;
        else if (personas[i].codigo == persona.codigo) return false;
      }
      personas[index] = persona;
      if (profilePic) {
        persona.foto = profilePic.name.substring(
          profilePic.name.lastIndexOf(".") + 1,
          profilePic.length
        );
        await this.uploadFileToStorage(
          profilePic,
          "Personas/" + persona.id + "_profile_pic." + persona.foto
        );
      }
      await this.setInDatabase(PERSONA_KEY, personas);
    }
    return true;
  }

  getPersonas(): Promise<Persona[]> {
    return this.getFromDatabase(PERSONA_KEY);
  }

  async getPersonasByFacilitador(idFacilitador): Promise<Persona[]> {
    let resultado = [];
    let personas = await this.getFromDatabase(PERSONA_KEY);
    for (let i of personas) {
      if (
        i.idFacilitadores.findIndex((element) => element == idFacilitador) != -1
      ) {
        resultado.push(i);
      }
    }
    return resultado;
  }

  async getPersona(id): Promise<Persona> {
    let personas = await this.getFromDatabase(PERSONA_KEY);
    for (let i of personas) {
      if (i.id == id) {
        return i;
      }
    }
    return undefined;
  }

  async setPersonaActiva(persona: Persona) {
    persona["tipo"] = "persona";
    await this.storage.set(ACTIVEUSER_KEY, persona);
    return persona;
  }

  async deletePersona(id: number) {
    let personas = await this.getFromDatabase(PERSONA_KEY);
    if (!personas) {
      return null;
    }

    let guardados: Persona[] = [];

    for (let i of personas) {
      if (i.id !== id) {
        guardados.push(i);
      }
    }
    await this.setInDatabase(PERSONA_KEY, guardados);
  }

  async loginPersona(codigo) {
    let personas = await this.getFromDatabase(PERSONA_KEY);
    if (!personas) return false;

    for (let i of personas) {
      if (i.codigo == codigo) {
        await this.setPersonaActiva(i);
        return true;
      }
    }
    return false;
  }

  checkCodigoPersona(codigo) {
    return this.getFromDatabase(PERSONA_KEY).then((personas: Persona[]) => {
      if (!personas || personas.length == 0) {
        return true;
      }

      for (let i of personas) {
        if (i.codigo == codigo) {
          return false;
        }
      }
      return true;
    });
  }

  async generarCodigo() {
    let animales = ["o", "g", "l", "c", "t", "z"];
    let numeros = [0, 0, 0];
    let codigo;
    let respuesta;

    do {
      for (let i = 0; i < numeros.length; i++) {
        numeros[i] = Math.floor(Math.random() * 6);
      }
      codigo =
        animales[numeros[0]] + animales[numeros[1]] + animales[numeros[2]];
      respuesta = await this.checkCodigoPersona(codigo);
      /*if (!respuesta) {
        console.log("Codigo repetido: " + codigo);
      }*/
    } while (!respuesta);
    return numeros;
  }

  /////////////////////////////////////ADMINISTRADOR/////////////////////////////////////
  //Metodos Administradores
  async loginAdmin(correo: string, contrasena: string) {
    let administradores = await this.getFromDatabase(ADMINISTRADOR_KEY);
    if (!administradores) return false;

    for (let i of administradores) {
      if (i.correo == correo && i.contrasena == contrasena) {
        await this.setAdministradorActivo(i);
        return true;
      }
    }
    return false;
  }

  getAdministradores(): Promise<Administrador[]> {
    return this.getFromDatabase(ADMINISTRADOR_KEY);
  }

  async setAdministradorActivo(administrador: Administrador) {
    administrador["tipo"] = "administrador";
    await this.storage.set(ACTIVEUSER_KEY, administrador);
    return administrador;
  }

  /////////////////////////////////////FACILITADOR/////////////////////////////////////
  // Metodos facilitadores
  async loginFacilitador(correo: string, contrasena: string) {
    let facilitadores = await this.getFromDatabase(FACILITADOR_KEY);
    if (!facilitadores) return false;

    for (let i of facilitadores) {
      if (i.correo == correo && i.contrasena == contrasena) {
        await this.setFacilitadorActivo(i);
        return true;
      }
    }
    return false;
  }

  async addFacilitador(facilitador: Facilitador, profilePic): Promise<any> {
    let nextID = await this.getFromDatabase(N_FACILITADOR_KEY);
    let facilitadores = await this.getFromDatabase(FACILITADOR_KEY);
    if (facilitadores) {
      facilitador["id"] = nextID;
      for (let i of facilitadores) {
        if (i.correo == facilitador.correo) return false;
      }
      if (profilePic) {
        facilitador.foto = profilePic.name.substring(
          profilePic.name.lastIndexOf(".") + 1,
          profilePic.length
        );
        await this.uploadFileToStorage(
          profilePic,
          "Facilitadores/" + facilitador.id + "_profile_pic." + facilitador.foto
        );
      }
      facilitadores.push(facilitador);
      await this.setInDatabase(FACILITADOR_KEY, facilitadores);
      await this.setInDatabase(N_FACILITADOR_KEY, facilitador.id + 1);
    }
    return true;
  }

  async editFacilitador(
    id: number,
    facilitador: Facilitador,
    profilePic
  ): Promise<any> {
    let facilitadores = await this.getFromDatabase(FACILITADOR_KEY);
    if (facilitadores) {
      var index;
      facilitador["id"] = id;
      for (let i = 0; i < facilitadores.length; ++i) {
        if (facilitadores[i].id == id) index = i;
        else if (facilitadores[i].correo == facilitador.correo) return false;
      }
      facilitadores[index] = facilitador;
      if (profilePic) {
        facilitador.foto = profilePic.name.substring(
          profilePic.name.lastIndexOf(".") + 1,
          profilePic.length
        );
        await this.uploadFileToStorage(
          profilePic,
          "Facilitadores/" + facilitador.id + "_profile_pic." + facilitador.foto
        );
      }
      await this.setInDatabase(FACILITADOR_KEY, facilitadores);
    }
    return true;
  }

  getFacilitadores(): Promise<Facilitador[]> {
    return this.getFromDatabase(FACILITADOR_KEY);
  }

  async getFacilitador(id): Promise<Facilitador> {
    let facilitadores = await this.getFromDatabase(FACILITADOR_KEY);
    for (let i of facilitadores) {
      if (i.id == id) {
        return i;
      }
    }
    return undefined;
  }

  async setFacilitadorActivo(facilitador: Facilitador) {
    facilitador["tipo"] = "facilitador";
    await this.storage.set(ACTIVEUSER_KEY, facilitador);
    return facilitador;
  }

  async deleteFacilitador(id: number) {
    let facilitadores = await this.getFromDatabase(FACILITADOR_KEY);
    if (!facilitadores) {
      return null;
    }

    let guardados: Facilitador[] = [];

    for (let i of facilitadores) {
      if (i.id !== id) {
        guardados.push(i);
      }
    }
    await this.setInDatabase(FACILITADOR_KEY, guardados);
  }

  /////////////////////////////////////GRUPOS/////////////////////////////////////
  //Metodos de Grupo

  async getGrupos(idFacilitador): Promise<Grupo[]> {
    let resultado = [];
    let grupos = await this.getFromDatabase(GRUPO_KEY);
    for (let i of grupos) {
      if (i.idFacilitador == idFacilitador) {
        resultado.push(i);
      }
    }
    return resultado;
  }

  async getGrupo(idFacilitador, idGrupo): Promise<Grupo> {
    let grupos = await this.getFromDatabase(GRUPO_KEY);
    for (let i of grupos) {
      if (i.idFacilitador == idFacilitador && i.id == idGrupo) {
        return i;
      }
    }
    return undefined;
  }

  async addGrupo(grupo: Grupo): Promise<any> {
    let nextID = await this.getFromDatabase(N_GRUPO_KEY);

    return this.getFromDatabase(GRUPO_KEY).then((grupos: Grupo[]) => {
      if (grupos) {
        grupo["id"] = nextID;
        for (let i of grupos) {
          if (
            i.nombre == grupo.nombre &&
            i.idFacilitador == grupo.idFacilitador
          ) {
            return false;
          }
        }
        grupos.push(grupo);
        this.setInDatabase(GRUPO_KEY, grupos);
      } else {
        grupo["id"] = 1;
        this.setInDatabase(GRUPO_KEY, [grupo]);
      }
      this.setInDatabase(N_GRUPO_KEY, grupo.id + 1);
      return true;
    });
  }
  async editGrupo(id: number, grupo: Grupo): Promise<any> {
    let grupos = await this.getFromDatabase(GRUPO_KEY);
    if (grupos) {
      var index;
      grupo["id"] = id;
      for (let i = 0; i < grupos.length; ++i) {
        if (grupos[i].id == id) index = i;
      }
      grupos[index] = grupo;
      await this.setInDatabase(GRUPO_KEY, grupos);
    }
    return true;
  }

  async deleteGrupo(id: number) {
    let grupos = await this.getFromDatabase(GRUPO_KEY);
    if (!grupos) {
      return null;
    }

    let guardados: Grupo[] = [];

    for (let i of grupos) {
      if (i.id !== id) {
        guardados.push(i);
      }
    }
    await this.setInDatabase(GRUPO_KEY, guardados);
  }

  /////////////////////////////////////EJERCICIOS/////////////////////////////////////
  //Metodos de Ejercicio
  async getEjerciciosByFacilitador(idFacilitador): Promise<Ejercicio[]> {
    let resultado = [];
    let ejercicios = await this.getFromDatabase(EJERCICIOS_KEY);
    for (let i of ejercicios) {
      if (i.idFacilitador == idFacilitador) {
        resultado.push(i);
      }
    }
    return resultado;
  }

  async getEjerciciosByPersona(idPersona): Promise<Ejercicio[]> {
    let resultado = [];
    let ejercicios = await this.getFromDatabase(EJERCICIOS_KEY);
    for (let i of ejercicios) {
      if (i.idPersonas) {
        if (i.idPersonas.findIndex((element) => element == idPersona) != -1) {
          resultado.push(i);
        }
      }
    }
    return resultado;
  }
  async getEjerciciosPendientes(idPersona, pendiente): Promise<Ejercicio[]> {
    let resultado = [];
    let ejercicios = await this.getFromDatabase(EJERCICIOS_KEY);
    let entregas = await this.getFromDatabase(ENTREGA_KEY);
    console.log(ejercicios)
    for (let i of ejercicios) {
      if (i.idPersonas) {
        if (i.idPersonas.findIndex((element) => element == idPersona) != -1) {
          let tieneEntrega = entregas.findIndex((element) => element.idPersona == idPersona && element.idEjercicio == i.id) != -1;
          if (pendiente != tieneEntrega) {
            resultado.push(i);
          }
        }
      }
    }
    return resultado;
  }
  async getEjercicio(idEjercicio): Promise<Ejercicio> {
    let ejercicios = await this.getFromDatabase(EJERCICIOS_KEY);
    for (let i of ejercicios) {
      if (i.id == idEjercicio) {
        return i;
      }
    }
    return undefined;
  }

  async addEjercicio(ejercicio: Ejercicio, picture, media): Promise<any> {
    let nextID = await this.getFromDatabase(N_EJERCICIOS_KEY);
    let ejercicios = await this.getFromDatabase(EJERCICIOS_KEY);
    if (ejercicios) {
      ejercicio["id"] = nextID;
      for (let i of ejercicios) {
        if (
          i.nombre == ejercicio.nombre &&
          i.idFacilitador == ejercicio.idFacilitador
        ) {
          return false;
        }
      }
      if (picture) {
        ejercicio.foto = picture.name.substring(
          picture.name.lastIndexOf(".") + 1,
          picture.length
        );
        await this.uploadFileToStorage(
          picture,
          "Ejercicios/" + ejercicio.id + "/foto." + ejercicio.foto
        );
      }
      if (media) {
        var reAudio = /(\.mpeg|\.mp3|\.wav|\.ogg)$/i;
        var formato = media.name.substring(
          media.name.lastIndexOf(".") + 1,
          media.length
        );
        if (!reAudio.exec(media.name)) {
          ejercicio.video = formato;
          await this.uploadFileToStorage(
            media,
            "Ejercicios/" + ejercicio.id + "/video." + ejercicio.video
          );
        } else {
          ejercicio.audio = formato;
          await this.uploadFileToStorage(
            media,
            "Ejercicios/" + ejercicio.id + "/audio." + ejercicio.audio
          );
        }
      }
      if (!ejercicio.borrador) {
        let grupo = await this.getGrupo(
          ejercicio.idFacilitador,
          ejercicio.idGrupo
        );
        ejercicio.idPersonas = grupo.idPersonas;
      }
      ejercicios.push(ejercicio);
      this.setInDatabase(EJERCICIOS_KEY, ejercicios);
      this.setInDatabase(N_EJERCICIOS_KEY, ejercicio.id + 1);
    }
    return true;
  }

  async editEjercicio(
    id: number,
    ejercicio: Ejercicio,
    picture,
    media
  ): Promise<any> {
    let ejercicios = await this.getFromDatabase(EJERCICIOS_KEY);
    if (ejercicios) {
      var index;
      ejercicio["id"] = id;
      for (let i = 0; i < ejercicios.length; ++i) {
        if (ejercicios[i].id == id) index = i;
        else if (
          ejercicios[i].nombre == ejercicio.nombre &&
          ejercicios[i].idFacilitador == ejercicio.idFacilitador
        )
          return false;
      }
      if (picture) {
        ejercicio.foto = picture.name.substring(
          picture.name.lastIndexOf(".") + 1,
          picture.length
        );
        await this.uploadFileToStorage(
          picture,
          "Ejercicios/" + ejercicio.id + "/foto." + ejercicio.foto
        );
      }
      if (media) {
        ejercicio.video = "";
        ejercicio.audio = "";
        var reAudio = /(\.mpeg|\.mp3|\.wav|\.ogg)$/i;
        var formato = media.name.substring(
          media.name.lastIndexOf(".") + 1,
          media.length
        );
        if (!reAudio.exec(media.name)) {
          ejercicio.video = formato;
          await this.uploadFileToStorage(
            media,
            "Ejercicios/" + ejercicio.id + "/video." + ejercicio.video
          );
        } else {
          ejercicio.audio = formato;
          await this.uploadFileToStorage(
            media,
            "Ejercicios/" + ejercicio.id + "/audio." + ejercicio.audio
          );
        }
      }
      if (!ejercicio.borrador) {
        let grupo = await this.getGrupo(
          ejercicio.idFacilitador,
          ejercicio.idGrupo
        );
        ejercicio.idPersonas = grupo.idPersonas;
      }
      ejercicios[index] = ejercicio;
      await this.setInDatabase(EJERCICIOS_KEY, ejercicios);
    }
    return true;
  }

  async deleteEjercicio(id: number) {
    let ejercicios = await this.getFromDatabase(EJERCICIOS_KEY);
    if (!ejercicios) {
      return null;
    }

    let guardados = [];

    for (let i of ejercicios) {
      if (i.id !== id) {
        guardados.push(i);
      }
    }
    await this.setInDatabase(EJERCICIOS_KEY, guardados);
  }

  /////////////////////////////////////ENTREGA/////////////////////////////////////
  //Metodos de Entrega

  async addEntrega(entrega: Entrega, media): Promise<any> {
    let nextID = await this.getFromDatabase(N_ENTREGA_KEY);
    let entregas = await this.getFromDatabase(ENTREGA_KEY);
    if (entregas) {
      entrega["id"] = nextID;
      if (media) {
        var reAudio = /(\.mpeg|\.mp3|\.wav|\.ogg)$/i;
        var formato = media.name.substring(
          media.name.lastIndexOf(".") + 1,
          media.length
        );
        let MediaPath =
          "Entregas/" + entrega.idPersona + "/" + entrega.idEjercicio;
        if (!reAudio.exec(media.name)) {
          entrega.video = formato;
          await this.uploadFileToStorage(
            media,
            MediaPath + "/video." + formato
          );
        } else {
          entrega.audio = formato;
          await this.uploadFileToStorage(
            media,
            MediaPath + "/audio." + formato
          );
        }
      }
      entregas.push(entrega);
      this.setInDatabase(ENTREGA_KEY, entregas);
      this.setInDatabase(N_ENTREGA_KEY, entrega.id + 1);
    }
    return true;
  }

  async getEntregasByEjercicio(idEjercicio): Promise<Entrega[]> {
    let resultado = [];
    let entregas = await this.getFromDatabase(ENTREGA_KEY);
    for (let i of entregas) {
      if (i.idEjercicio == idEjercicio) {
        resultado.push(i);
      }
    }
    return resultado;
  }

  async getEntregasByPersona(idPersona): Promise<Entrega[]> {
    let resultado = [];
    let entregas = await this.getFromDatabase(ENTREGA_KEY);
    for (let i of entregas) {
      if (i.idPersona == idPersona) {
        resultado.push(i);
      }
    }
    return resultado;
  }

  async getEntrega(idEntrega): Promise<Entrega> {
    let entrega = await this.getFromDatabase(ENTREGA_KEY);
    for (let i of entrega) {
      if (i.id == idEntrega) {
        return i;
      }
    }
    return undefined;
  }

  /////////////////////////////////////FEEDBACK/////////////////////////////////////
  //Metodos de Feedback
  getFeedbacks(): Promise<FeedbackGeneral[]> {
    return this.getFromDatabase(FEEDBACKGENERAL_KEY);
  }

  async getFeedback(idFeedback): Promise<FeedbackGeneral> {
    let Feedbacks = await this.getFromDatabase(FEEDBACKGENERAL_KEY);
    for (let i of Feedbacks) {
      if (i.id == idFeedback) {
        return i;
      }
    }
    return undefined;
  }

  async addFeedback(FeedbackGeneral: FeedbackGeneral, media): Promise<any> {
    let nextID = await this.getFromDatabase(N_FEEDBACKGENERAL_KEY);
    let feedbacks = await this.getFromDatabase(FEEDBACKGENERAL_KEY);
    if (FeedbackGeneral) {
      FeedbackGeneral["id"] = nextID;
      var index = feedbacks.length;
      for (let i = 0; i < feedbacks.length && feedbacks.length == index; ++i) {
        if (feedbacks[i].idPersona == FeedbackGeneral.idPersona) {
          index = i;
        }
      }
      if (feedbacks.length == index) {
        feedbacks.push(FeedbackGeneral);
        this.setInDatabase(N_FEEDBACKGENERAL_KEY, FeedbackGeneral.id + 1);
        if (media) {
          FeedbackGeneral.video = "";
          FeedbackGeneral.audio = "";
          var reAudio = /(\.mpeg|\.mp3|\.wav|\.ogg)$/i;
          var formato = media.name.substring(
            media.name.lastIndexOf(".") + 1,
            media.length
          );
          if (!reAudio.exec(media.name)) {
            FeedbackGeneral.video = formato;
            await this.uploadFileToStorage(
              media,
              "Feedbacks/" +
                FeedbackGeneral.id +
                "/video." +
                FeedbackGeneral.video
            );
          } else {
            FeedbackGeneral.audio = formato;
            await this.uploadFileToStorage(
              media,
              "Feedbacks/" +
                FeedbackGeneral.id +
                "/audio." +
                FeedbackGeneral.audio
            );
          }
        }
      } else {
        FeedbackGeneral.id = feedbacks[index].id;
        feedbacks[index] = FeedbackGeneral;
        if (media) {
          FeedbackGeneral.video = "";
          FeedbackGeneral.audio = "";
          var reAudio = /(\.mpeg|\.mp3|\.wav|\.ogg)$/i;
          var formato = media.name.substring(
            media.name.lastIndexOf(".") + 1,
            media.length
          );
          if (!reAudio.exec(media.name)) {
            FeedbackGeneral.video = formato;
            await this.uploadFileToStorage(
              media,
              "Feedbacks/" +
                FeedbackGeneral.id +
                "/video." +
                FeedbackGeneral.video
            );
          } else {
            FeedbackGeneral.audio = formato;
            await this.uploadFileToStorage(
              media,
              "Feedbacks/" +
                FeedbackGeneral.id +
                "/audio." +
                FeedbackGeneral.audio
            );
          }
        }
      }
      this.setInDatabase(FEEDBACKGENERAL_KEY, feedbacks);
    }
    return true;
  }
}
