/*
import { createSelector } from 'reselect'

export const getFilterValue = state => state.app.todoLists.map(fv => fv.filterValue);
export const getTodoLists = state => state.app.todoLists;
export const getTasks = state => state.app.todoLists.tasks;

export const getVisibleTask = createSelector(
    [ getFilterValue, getTasks ],
    (filterValue, tasks) => {
        switch (filterValue) {
            case "Active":
                return tasks.filter(t => t.isDone);
            case "Completed":
                return tasks.filter(t => !t.isDone);
            default:
                return tasks
        }
    }
);*/
