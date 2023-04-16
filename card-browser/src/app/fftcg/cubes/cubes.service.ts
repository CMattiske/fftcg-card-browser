import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/logging.service';
import { BackendService } from '../backend/backend.service';
import { ICube, ICubeCard } from '../backend/resources/cube';
import { Observable, map, shareReplay } from 'rxjs';
import { Cube } from './cube';
import { CubeCard } from './cube-card';

@Injectable({
  providedIn: 'root'
})
export class CubesService {

  allCubes$: Observable<Cube[]> = this.backendService.getAllCubes().pipe(
    map((rawCubes: ICube[]): Cube[] => {
      return rawCubes.map(CubesService.Cube);
    }),
    shareReplay(1),
  );

  constructor(
    private loggingService: LoggingService,
    private backendService: BackendService,
  ) { }

  private static Cube(rawCube: ICube): Cube {
    return new Cube(rawCube.id, rawCube.name, rawCube.cards.map(card => new CubeCard(card.setID, card.rank)));
  }

  public static ICube(cube: Cube): ICube {
    return {
      id: cube.id,
      name: cube.name,
      cards: cube.cards.map(cubeCard => {
        return {
          setID: cubeCard.setID,
          rank: cubeCard.rank
        } as ICubeCard;
      }),
    } as ICube;
  }
}
