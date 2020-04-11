import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Team } from '../interfaces/team';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const TeamsTableHeaders = ['name', 'country', 'players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {
private teamsBd: AngularFireList<Team>;
  constructor(private db: AngularFireDatabase) {
    this.teamsBd = this.db.list('/team', ref => ref.orderByChild('name'));
  }
  getTeam(): Observable<Team[]> {
    return this.teamsBd.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
      })
    );
  }
  addTeam(team: Team) {
    return this.teamsBd.push(team);
  }
  deleteTeam(id: string) {
    this.db.list('/team').remove(id);
  }
  editTeam(newTeamData) {
    const $key = newTeamData.$key;
    delete(newTeamData.$key);
    this.db.list('/team').update($key, newTeamData);
  }
}
