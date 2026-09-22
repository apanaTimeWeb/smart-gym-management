// RESPONSIBILITY: Runtime event bus abstraction for decoupled feature side effects.
// FLOW: Committed mutation → event publish → independent consumer processing.
import { Injectable } from '@nestjs/common'; import { EventEmitter } from 'node:events'; @Injectable() export class CoreEventService{private readonly bus=new EventEmitter();emit<T>(name:string,payload:T):void{this.bus.emit(name,payload)}on<T>(name:string,handler:(payload:T)=>void):void{this.bus.on(name,handler)}}
