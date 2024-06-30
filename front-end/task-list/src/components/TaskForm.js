import React, { useState, useEffect } from 'react';
import TaskService from '../service/TaskService';

const TaskForm = ({ id, onSave }) => {
    const [task, setTask] = useState({});
    
    useEffect(() => {
        if (!id) return;
        const load = async () => {
            const loadedTask = await TaskService.getTask(id);
            setTask(loadedTask);
        };
        load();
    }, [id, setTask]);

    const handleChange = (event) => {
        setTask({
            ...task,
            description: event.target.value, // Corrigido de 'descriptio' para 'description'
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            TaskService.updateTask(id, task)
                .then(() => {
                    if (onSave) onSave(); // Verifica se onSave é uma função antes de chamar
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            TaskService.createTask(task)
                .then(() => {
                    if (onSave) onSave(); // Verifica se onSave é uma função antes de chamar
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='description'
                placeholder='Descrição da tarefa'
                onChange={handleChange}
                value={task.description || ''}
            />
            <button type='submit'>Salvar</button>
        </form>
    );
};

export default TaskForm;
