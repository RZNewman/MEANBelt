
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    ) { }
  pet ={}
  errors ={};
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
  updatePet(){
    //console.log(this.pet)
    let obs  = this._httpService.updatePet(this.pet)
    obs.subscribe(data =>{
      if(data['errors']){
        this.errors = data['errors']
      }
      else{
        this._router.navigate([`/pets/${this.pet['_id']}`]);
      }
    })

  }
}
