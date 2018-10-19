import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) {}
  pets = [];
  ngOnInit() {
    let obs = this._httpService.all();
    obs.subscribe(data =>{
      this.pets = data['pets'];
    })
  }
  details(pet){
    this._router.navigate([`/pets/${pet._id}`])
  }
  edit(pet){
    this._router.navigate([`/pets/${pet._id}/edit`])
  }
  

}
