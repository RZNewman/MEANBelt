
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    ) { }
  pet ={}
  errors ={};
  liked = false;
  ngOnInit() {
    this.errors = {}
    this._route.params.subscribe((params: Params) => {
      let obs  = this._httpService.getPet(params.id)
      //console.log(params);
      obs.subscribe(data =>{
        console.log(data);
        this.pet = data['pet'];
      })
    });
    
  }
  delete(pet){
    let obs = this._httpService.deletePet(pet._id);
    obs.subscribe(data =>{
      this._router.navigate([`/pets`]);
    })
  }
  like(pet){
    this.liked = true;
    pet.likes++;
    let obs = this._httpService.likePet(pet._id);
    obs.subscribe(data =>{
      //this._router.navigate([`/pets`]);
    })
  }

}
