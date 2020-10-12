import { STORAGE_KEYS } from './../config/storage-keys.config';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local-user';

@Injectable()
export class StorageService {

	constructor() { }

	/** */
	getLocalUser() : LocalUser {
		let user = localStorage.getItem(STORAGE_KEYS.localUser);
		return user == null ? null : JSON.parse(user);
	}

	/** */
	setLocalUser(obj: LocalUser) {
		(obj == null) ? localStorage.removeItem(STORAGE_KEYS.localUser) : localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
	}

}
