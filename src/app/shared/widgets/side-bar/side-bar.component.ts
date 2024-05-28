import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  modalstatus: boolean = true
  @Input('tasks') tasks?: Array<any>




  // ngOnInit() {
  //   this.items = [
  //     {
  //       key: '0',
  //       label: 'Users',
  //       items: [
  //         {
  //           key: '0_1',
  //           label: 'New',
  //           items: [
  //             {
  //               key: '0_1_0',
  //               label: 'Member'
  //             },
  //             {
  //               key: '0_1_1',
  //               label: 'Group'
  //             }
  //           ]
  //         },
  //         {
  //           key: '0_2',
  //           label: 'Search'
  //         }
  //       ]
  //     },
  //     {
  //       key: '1',
  //       label: 'Tasks',
  //       items: [
  //         {
  //           key: '1_0',
  //           label: 'Add New'
  //         },
  //         {
  //           key: '1_1',
  //           label: 'Pending'
  //         },
  //         {
  //           key: '1_2',
  //           label: 'Overdue'
  //         }
  //       ]
  //     },
  //     {
  //       key: '2',
  //       label: 'Calendar',
  //       items: [
  //         {
  //           key: '2_0',
  //           label: 'New Event'
  //         },
  //         {
  //           key: '2_1',
  //           label: 'Today'
  //         },
  //         {
  //           key: '2_2',
  //           label: 'This Week'
  //         }
  //       ]
  //     }
  //   ];
  // }


}
