import { DomainObjects } from "../domain/collection/DomainObjects";
import { Aggregate } from "../domain/entity/Aggregate";
import { DomainEntity } from "../domain/entity/DomainEntity";
import { Id } from "../domain/Id";


export interface Repository<E extends EntityOrAggregate | DomainObjects<EntityOrAggregate, any>> {
    findById(id: Id<E>): Promise<E>;
    save(entityOrAggregate: E): Promise<SaveResult<E>>;
    update(entityOrAggregate: E): Promise<UpdateResult<E>>;
    delete(entityOrAggregate: E): Promise<DeleteResult<E>>;
}

type EntityOrAggregate = DomainEntity<any> | Aggregate<any>

export interface SaveResult<E> { };
export interface UpdateResult<E> { };
export interface DeleteResult<E> { };