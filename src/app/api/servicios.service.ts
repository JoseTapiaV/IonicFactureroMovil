import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../entidades';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  endPoint = environment.backEndServer + 'api/servicio/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private _refresh$ = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  postService(servicio: Servicio) {
    let finalUrl = this.endPoint + 'create';
    return this.httpClient.post<Servicio>(finalUrl, JSON.stringify(servicio), this.httpOptions)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );

  }

  listarAllServicio(idUser: number): Observable<Servicio[]> {
    let finalUrl = this.endPoint + 'findAll';
    return this.httpClient.get<Servicio[]>(finalUrl+"/"+idUser, this.httpOptions)
   

  }

 


  updateServicio(servicio: Servicio){
    let finalUrl = this.endPoint + 'update';
    return this.httpClient.post<Servicio>(finalUrl, JSON.stringify(servicio), this.httpOptions)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );

  }
  deleteServicio(id: number){
    let finalUrl = this.endPoint + 'delete';
    return this.httpClient.get(finalUrl+"/"+id)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
   

  }

}
