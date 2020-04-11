import { Injectable } from '@angular/core';
import {Player} from '../interfaces/player';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {} from 'angularfire2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerDb: AngularFireList<Player>;
  constructor(private db: AngularFireDatabase) {
    this.playerDb = this.db.list('/players', ref => ref.orderByChild('name'));
  }
  getPlayer(): Observable<Player[]> {
    return this.playerDb.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
      })
    );
  }
  addPlayer(player: Player) {
    return this.playerDb.push(player);
  }
  deletePlayer(id: string) {
    this.db.list('/players').remove(id);
  }
  editPlayer(newPlayerData) {
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key);
    this.db.list('/player').update($key, newPlayerData);
  }
}
