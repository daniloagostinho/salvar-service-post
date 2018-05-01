import { TipoPerfil } from './../../app/models/enums/perfil.enum';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Properties } from '../../app/properties';
import { Handle } from './../../app/handle';
import 'rxjs/add/operator/map';
import { Usuario } from './../../app/models/model/usuario';
import { TipoCadastro } from '../../app/models/enums/cadastro.enum';

@Injectable()
export class SalvarService {
  tipo;
  tipoPerfil;
  constructor(
    private http: Http,
    public propers: Properties,
    public handle: Handle) {
  }

  salvarForm(dados: Usuario) {
    dados.tipoCadastro = TipoCadastro.FORMULARIO;
    dados.tipoUsuario = TipoPerfil.CONSUMIDOR;
    return this.salvar(dados);
  }

  salvarFacebook(dados: Usuario) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> salvarFacebook: ' , dados.nome);
    dados.tipoCadastro = TipoCadastro.FACEBOOK;
    dados.tipoUsuario = TipoPerfil.CONSUMIDOR;
    return this.salvar(dados);
  }

  salvarGoogle(dados: Usuario) {
    dados.tipoCadastro = TipoCadastro.GMAIL;
    dados.tipoUsuario = TipoPerfil.CONSUMIDOR;
    return this.salvar(dados);
  }

  private salvar(dados: Usuario) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> salvar: ' , dados.nome);
    return this.http
      .post(this.propers.getApi + '/usuarios/salvar', JSON.stringify(dados), {headers: this.propers.getHeaders})
      .toPromise()
      .then(res => console.log('USUARIO SALVO NO BANCO: ', res.json()))
      .catch(this.handle.getError);
  }

}
