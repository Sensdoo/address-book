import { Entrance } from './entrance.entity';

export class Address {
	constructor(
		streetId: string,
		house: number,
		building: number,
		entrances: Entrance[],
		id?: number
	) {}
}
