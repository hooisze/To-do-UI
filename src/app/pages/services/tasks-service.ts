import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tasks } from '../../models/taskList';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public taskList$: BehaviorSubject<Tasks[]> = new BehaviorSubject<Tasks[]>([]);
  // public currentTask$!: BehaviorSubject<Tasks> ;
  public currentTask$: BehaviorSubject<Tasks>= new BehaviorSubject<Tasks>({id: 0, name: '', description:'', completed: false, subTasks: []}); ;
  constructor() {}

  public clearTaskList(): void {
    this.taskList$.next([]);
    this.resetCurrentTask()
  }

  public resetCurrentTask(): void {
    // Define the default task object
    const defaultTask: Tasks = {
      id: 0,
      name: '',
      description: '',
      completed: false,
      subTasks: []
    };

    // Emit the default task to reset the BehaviorSubject
    this.currentTask$.next(defaultTask);
  }
}
