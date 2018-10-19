import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    ) { }
  pet ={name:"",type:"", desc:"", skill1:"",skill2:"",skill3:""}
  errors ={};
  ngOnInit() {
    this.errors = {}
  }
  createPet(){
    //console.log(this.author)
    let obs  = this._httpService.createPet(this.pet)
    obs.subscribe(data =>{
      if(data['errors']){
        console.log(data);
        this.errors = data['errors']
      }
      else{
        this._router.navigate(['/pets']);
      }
    })
  }
}
