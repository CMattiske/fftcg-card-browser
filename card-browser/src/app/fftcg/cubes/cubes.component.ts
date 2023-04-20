import { Component, OnInit } from '@angular/core';

import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

import { Cube } from './cube';
import { CubesService } from './cubes.service';
import { CubeCard } from './cube-card';

@Component({
  selector: 'app-cubes',
  templateUrl: './cubes.component.html',
  styleUrls: ['./cubes.component.scss']
})
export class CubesComponent implements OnInit{
  
  pendingCubes: Cube[] = [];

  private myCube: Cube | undefined;

  private newCube$: BehaviorSubject<Cube | undefined> = new BehaviorSubject<Cube | undefined>(undefined);
  private pendingCubes$: BehaviorSubject<Cube[]> = new BehaviorSubject<Cube[]>([]);

  protected cubes$: Observable<Cube[]> = combineLatest([this.cubesService.allCubes$, this.pendingCubes$]).pipe(
    map(([existingCubes, pendingCubes]: [Cube[], Cube[]]): Cube[] => existingCubes.concat(pendingCubes)),
  );

  constructor(private cubesService: CubesService) {}

  protected get cube(): Cube | undefined {
    return this.myCube;
  }

  protected set cube(value: Cube | undefined) {
    this.myCube = value;
  }

  protected onClickCreateNew(): void {
    this.newCube$.next(new Cube(undefined, 'Untitled Cube', []));
  }

  protected onClickClone(): void {
    if (this.myCube) {
      this.newCube$.next(new Cube(
        undefined,
        `Copy of ${this.myCube.name}`,
        this.myCube.cards.map(cubeCard => new CubeCard(cubeCard.setID, cubeCard.rank))));
    }
  }

  ngOnInit(): void {
    this.newCube$.subscribe((cube: Cube | undefined) => {
      if (cube) {
        this.pendingCubes.push(cube);
        this.pendingCubes$.next(this.pendingCubes);
        this.myCube = cube;
      }
    });
  }
}
