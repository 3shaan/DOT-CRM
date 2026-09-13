import { inject, Service } from '@angular/core';
import { UserService } from '@api/index';

@Service()
export class User {
    private readonly userService = inject(UserService);

    getAllUsers() {
        return this.userService.getApiUsers();
    }

    getUserById(id: string) {
        return this.userService.getApiUsersId(id);
    }
}
