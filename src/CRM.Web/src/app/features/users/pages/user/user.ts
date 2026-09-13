import { Component, inject } from '@angular/core';
import { getApiUsersResource } from '@api/index';
import { TableModule } from '@openng/optimus-ui/table';

@Component({
  imports: [ TableModule],
  selector: 'app-user',
  templateUrl: './user.html',
})
export class User {
   readonly userResource = getApiUsersResource();
 
}
