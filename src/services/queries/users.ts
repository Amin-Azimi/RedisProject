import { usersKey } from '$services/keys';
import { client } from '$services/redis';
import type { CreateUserAttrs, User } from '$services/types';
import { genId } from '$services/utils';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
    const user =await client.hGetAll(usersKey(id));
    return deSerialize(id,user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
	const id = genId();

	await client.hSet(usersKey(id),serialize(attrs));

    return id;
};

const serialize = (user: CreateUserAttrs) => {
	return {
        userName: user.username,
        password: user.password 
    };
};

const deSerialize = (userId: string, user: {[key:string]: string}) =>{
    return{
        id: userId,
        username:  user.username,
        password: user.password
    } as User;
}