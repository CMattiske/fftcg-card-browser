import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/logging.service';
import { BackendService } from '../backend/backend.service';
import { CardsService } from '../cards/cards.service';

@Injectable({
  providedIn: 'root'
})
export class CubesService {

  constructor(
    private loggingService: LoggingService,
    private backendService: BackendService,
    private cardsService: CardsService,
  ) { }
}
