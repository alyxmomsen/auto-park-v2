import { EntityCreator } from '../_EntityCreator';

interface IQueryState {
	isDone(): boolean;
}

abstract class QueryState implements IQueryState {
	abstract isDone(): boolean;
}

class QueryIsDone extends QueryState {
	isDone(): boolean {
		return true;
	}
}

class QueryIsNotDone extends QueryState {
	isDone(): boolean {
		return false;
	}
}

export class Query {
	state: QueryState;

	private setDone() {
		if (!this.state.isDone()) {
			this.state = new QueryIsDone();
		}
	}

	execute(/* entityCreator:EntityCreator */) {
		this.setDone();
	}

	constructor() {
		this.state = new QueryIsNotDone();
	}
}
