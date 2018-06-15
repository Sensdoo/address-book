import {Entrance} from '../../entities/entrance.entity';

export class EntranceStorageService {

  private entrance: Entrance;

  constructor() {}

  getEntrance() {
    return this.entrance;
  }

  setEntrance(entrance: Entrance) {
    this.entrance = entrance;
  }
}
