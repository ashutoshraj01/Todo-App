import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { isNgTemplate } from '@angular/compiler';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
        trigger('fade', [

            transition(':enter', [
              style({ opacity: 0, transform: 'translateY(20px)' }),
              animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
            ]),

            transition(':leave', [
              animate(200, style({ opacity: 1, transform: 'translateY(20px)'}))
            ]),

        ])
  ]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  constructor() { }

  ngOnInit(): void {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        id : 1,
        title : 'Finish this app',
        completed : false,
        editing : false
      },
      {
        id : 2,
        title : 'Finish all the goals',
        completed : false,
        editing : false
      },
      {
        id : 3,
        title : 'Finish the game',
        completed : false,
        editing : false
      }
    ];
  }

  addTodo(): void {
    this.todos.push({
    id : this.idForTodo,
    title : this.todoTitle,
    completed : false,
    editing : false
    });
    this.todoTitle = '';
    this.idForTodo++;
  }

  deleteTodo(id: number): void{
      this.todos = this.todos.filter(todo => todo.id !== id);
  }
  doneEdit(todo: Todo): void{
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }
  cancelEdit(todo: Todo): void{
      todo.title = this.beforeEditCache;
      todo.editing = false;
  }
  editTodo(todo: Todo): void{
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }
  remaining(): number{
    return this.todos.filter(item => !item.completed).length;
  }
  atLeastOneCompleted(): boolean{
    return this.todos.filter(item => item.completed).length > 0;
  }
  clearCompleted(): void{
   this.todos =  this.todos.filter( item => !item.completed);
  }
  checkAll(): void{
    this.todos = this.todos.filter(item => {
      item.completed = !item.completed;
      return item;
    }
      );
    // Anoter way
    // this.todos.forEach(item => item.completed =(<HTMLInputElement>event.target).checked)
  }
  todosFiltered(): Todo[] {
   if (this.filter === 'all'){
     return this.todos;
   } else if (this.filter === 'active'){
      return this.todos.filter(item => !item.completed);
   } else if (this.filter === 'completed'){
      return this.todos.filter(item => item.completed);
   }
  }
}
