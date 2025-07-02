import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../../share.module';
import { map } from 'rxjs';
import { SubTasks, Tasks } from '../../../models/taskList';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule, ShareModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails {
  public newSubTask: string = '';

  constructor(public taskService: TasksService) {
    this.taskService.currentTask$?.pipe(map((tasks) => console.log(tasks)));
  }

  public addSubTask( subTask: string): void {
    console.log(subTask)
    const currentTasks = this.taskService.currentTask$.getValue();
    const newSubTask: SubTasks = {
      id: currentTasks.subTasks.length + 1,
      name: subTask,
      completed: false
    };

    currentTasks.subTasks.push(newSubTask);
    this.newSubTask = ""
  }

  public updateTask(updatedTask: Tasks): void {

    const currentTasks = this.taskService.taskList$.getValue();

    const updatedTasks = currentTasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );



    this.taskService.taskList$.next(updatedTasks);
  }

  public removeTask(taskId: number): void {
    const currentTasks = this.taskService.taskList$.getValue();

    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);

    this.taskService.taskList$.next(updatedTasks);
    this.taskService.resetCurrentTask()
  }
}
