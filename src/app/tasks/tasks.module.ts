import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks.routing.module';

import { TaskListComponent, TaskComponent, TaskArrayService } from '.';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule
  ],
  providers: [
    TaskArrayService
  ]
})
export class TasksModule {}
