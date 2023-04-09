import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Cube } from './cube';
import { CubesService } from './cubes.service';

@Component({
  selector: 'app-cubes',
  templateUrl: './cubes.component.html',
  styleUrls: ['./cubes.component.scss']
})
export class CubesComponent {
  protected cubes$: Observable<Cube[]> = this.cubesService.allCubes$;

  private myCube: Cube | undefined;

  constructor(private cubesService: CubesService) {}

  protected get cube(): Cube | undefined {
    return this.myCube
  }

  protected set cube(value: Cube | undefined) {
    this.myCube = value;
  }
}
