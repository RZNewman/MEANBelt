import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){

  }

  all(){

    return this._http.get('/xp/pet');

  }
  createPet(pet){
    return this._http.post('/xp/pet', pet)

  }
  getPet(id){
    return this._http.get(`/xp/pet/${id}`);
  }
  updatePet(pet){
    return this._http.put(`/xp/pet/${pet._id}`, pet);
  }
  deletePet(id){
    return this._http.delete(`/xp/pet/${id}`);
  }
  likePet(id){
    return this._http.get(`/xp/pet/${id}/like`);
  }
  // createRate(cake, rating){
  //   return this._http.post(`/rating/cake/${cake._id}`, rating)

  // }
  
}

