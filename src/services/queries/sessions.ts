import { session } from '$app/stores';
import { sessionsKey } from '$services/keys';
import { client } from '$services/redis';
import type { Session } from '$services/types';
import { genId } from '$services/utils';

export const getSession = async (id: string) => {
    const session = await client.hGetAll(sessionsKey(id));

    if(Object.keys(session).length === 0){
        return null;
    }

    return deSerialize(id,session);
};

export const saveSession = async (session: Session) => {
    return await client.hSet(sessionsKey(session.id) , serialize(session));
};

const serialize = (session: Session) =>{
    return{
        userId: session.userId,
        userName: session.userId
    }
}

const deSerialize = (id: string, session: {[key:string]: string}) =>{
    return{
        id,
        username:  session.username,
        userId: session.userId
    };
}
