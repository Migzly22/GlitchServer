import { Router } from 'express';
import TestController from '../../controllers/test/TestController';

export default class MainRoute {
  private _controller = new TestController();

  static main : Router = Router();

  getRoutes = () =>{
    return [
        {method : 'GET',path : '/', controller : this._controller.findAll},
        {method : 'GET',path : '/', controller : this._controller.findById}
    ]
  }
}
