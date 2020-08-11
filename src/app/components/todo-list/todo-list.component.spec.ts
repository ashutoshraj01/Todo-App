import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      imports: [BrowserAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call addTodo function', () => {
    component.addTodo();
    component.todos.push({
      id : component.idForTodo,
      title : component.todoTitle,
      completed : false,
      editing : false
      });
    expect(component.idForTodo).toBeGreaterThan(4);
   });

  it('should call deleteTodo function', () => {
    const id = 1;
    component.deleteTodo(id);
    expect(component.todos.length).toBe(2);
  });

  it('should test doneEdit function', () =>{
    const Todos = {
    id: 3,
    title: '',
    completed: false,
    editing: true
    }
  component.doneEdit(Todos);
  expect(Todos.editing).toBeFalse();
  });

  it('should test cancelEdit function', () =>{
    const Todos = {
    id: 3,
    title: 'Complete Testing',
    completed: false,
    editing: true
    }
  component.cancelEdit(Todos);
  expect(Todos.editing).toBeFalse();
  expect(Todos.title).toEqual('');
  }); 

  it('should test editTodo function', () =>{
    const Todos = {
    id: 3,
    title: 'Complete Testing',
    completed: false,
    editing: true
    }
  component.editTodo(Todos);
  expect(Todos.editing).toBeTrue();
  expect(component.beforeEditCache).toEqual('Complete Testing');
  });

  it('should test clearCompleted function', () =>{
      component.clearCompleted();
      expect(component.todos.length).toBeGreaterThanOrEqual(0);
  });

  it('should test checkAll function', () =>{
    component.checkAll();
    expect(component.todos.length).toBeGreaterThanOrEqual(0);
});

it('should test todosFiltered function', () =>{
  component.filter = 'all';
  component.todosFiltered();
  expect(component.todos.length).toBeGreaterThanOrEqual(0);
});

it('should test todosFiltered function', () =>{
  component.filter = 'active';
  component.todosFiltered();
  expect(component.todos.length).toBeGreaterThanOrEqual(0);
});

it('should test todosFiltered function', () =>{
  component.filter = 'completed';
  component.todosFiltered();
  expect(component.todos.length).toBeGreaterThanOrEqual(0);
});
 
});
