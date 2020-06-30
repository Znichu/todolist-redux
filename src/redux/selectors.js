import { createSelector } from 'reselect';

export const getTask = (state) => state.app.todoLists;

export const getFilterValue = (state) => state.app.todoLists.map(t => t.filterValue);

export const getFilteredTask = createSelector(getTask, getFilterValue, (task, filterValue) => {
    console.log(task);
    console.log(filterValue[0]);
    switch (filterValue[0]) {
        case 'Completed':
            return task.filter(t => t.status === 2);
        case 'Active':
            return task.filter(t => t.status === 0);

        default:
            return task;
    }
});
