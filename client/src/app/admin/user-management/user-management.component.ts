import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User } from '../../_models/user';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';
import { AdminService } from './../../_services/admin.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  private adminService = inject(AdminService);
  private modalService = inject(BsModalService);
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> =
    new BsModalRef<RolesModalComponent>();

  ngOnInit() {
    this.getUsersWithRoles();
  }

  openRolesModal(user: User) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User roles',
        username: user.username,
        selectedRoles: [...user.roles],
        availableRoles: ['Admin', 'Moderator', 'Member'],
        users: this.users,
        rolesUpdated: false,
      },
    };

    this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
    this.bsModalRef.onHide?.subscribe(() => {
      if (this.bsModalRef.content && this.bsModalRef.content.rolesUpdated) {
        const selectedRoles = this.bsModalRef.content.selectedRoles;

        this.adminService.updateUserRoles(user.username, selectedRoles).subscribe(() => {
          user.roles = [...selectedRoles];
        });
      }
    });
  }

  getUsersWithRoles() {
    this.adminService.getUserWithRoles().subscribe((users) => {
      this.users = users;
    });
  }
}
