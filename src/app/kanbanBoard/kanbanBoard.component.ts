import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  newTask: '';

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  createTask = () => {
    if(this.newTask) {
      let task = {name : this.newTask, stage: 0}
      this.tasks = [...this.tasks, task];
      this.configureTasksForRendering();
      this.newTask = ''
    }
  }

  moveTaskForward = (taskName) => {
    this.tasks.map(task => {
      if(task.name === taskName) {
        task.stage < 3 && task.stage++;
        this.configureTasksForRendering();
      }
    })
  }

  moveTaskBackward = (taskName) => {
    this.tasks.map(task => {
      if(task.name === taskName) {
        task.stage > 0 && task.stage--;
        this.configureTasksForRendering();
      }
    })
  }

  deleteTask = (taskName) => {
    this.tasks = this.tasks.filter(task => task.name !== taskName)
    this.configureTasksForRendering();
  }
}

interface Task {
  name: string;
  stage: number;
}