import { Router } from 'express';
import ClockifyController from '../../controllers/clockify/ClockifyController';


export default class MainRoute {
  private _controller = new ClockifyController();

  getRoutes = () =>{
    return [
        {method : 'GET',path : '/user', controller : this._controller.findUserData},
        {method : 'GET',path : '/print', controller : this._controller.print}
    ]
  }
}
