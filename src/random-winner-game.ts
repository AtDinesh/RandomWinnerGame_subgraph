import { BigInt } from "@graphprotocol/graph-ts";
import {
  GameEnded as GameEndedEvent,
  GameStarted as GameStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlayerEntered as PlayerEnteredEvent
} from "../generated/RandomWinnerGame/RandomWinnerGame"
import {
  GameEnded,
  GameStarted,
  OwnershipTransferred,
  PlayerEntered, 
  Game
} from "../generated/schema"

export function handleGameEnded(event: GameEndedEvent): void {
  // Entities can be loaded from the store using a string ID; 
  // this ID needs to be unique across all entities of the same type
  let entity = Game.load(event.params.gameId.toString());
  // Entities only exist after they have been saved to the store;
  
  if(!entity) {
    return;
  }
  // Entity fields can be set based on event parameters
  entity.winner = event.params.winner;
  entity.requestId = event.params.requestId;

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleGameStarted(event: GameStartedEvent): void {
  let entity = Game.load(event.params.gameId.toString());
  if (!entity) {
    return;
  }
  entity.maxPlayers = event.params.maxPlayers;
  entity.entryFee = event.params.entryFee;

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {}

export function handlePlayerEntered(event: PlayerEnteredEvent): void {
  let entity = Game.load(event.params.gameId.toString());

  if (!entity){
    return;
  }
  let newPlayers = entity.players;
  newPlayers.push(event.params.player);
  entity.players = newPlayers;

  entity.save()
}
