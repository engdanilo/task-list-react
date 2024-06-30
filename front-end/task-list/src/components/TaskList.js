// import React, {useState, useEffect} from 'react';
// import {ToastContainer, toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Modal from 'react-modal';
// import TaskService from '../service/TaskService';
// import TaskForm from './TaskForm';
// import './../style/style.css';

// const TaskList = () => {

//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [tasks, setTasks] = useState([]);
//     const [page, setPage] = useState(1);
//     const [currentTaskId, setCurrentTaskId] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchTasks();
//     }, [page]);

//     const fetchTasks = async () => {
//         const data = await fetch(page, 4);
//         if (page === 1){
//             setTasks(data);
//             return;
//         }
//         setTasks([...tasks, ...data]);
//     };

//     const loadMore = () => {
//         setPage(page + 1);
//     };

//     const handleCloseModal = () => {
//         setModalIsOpen(false);
//     };

//     const handleNew = () => {
//         setModalIsOpen(true);
//         setCurrentTaskId(0);
//     };

//     const handleEdit = (id) => {
//         setCurrentTaskId(id);
//         setModalIsOpen(true);
//     };

//     const handleDelete = (id) => {
//         TaskService.deleteTask(id)
//         .then(() => {
//             fetchTasks();
//             toast.success('Tarefa excluída com sucesso!');
//         })
//         .catch((err) => {
//             console.log(err);
//             toast.error('Erro ao excluir tarefa!');
//         });
//     };

//     const handleSave = async() => {
//         handleCloseModal();
//         toast.success('Dados atualizados com sucesso!');
//         setPage(1);
//         await fetchTasks();
//     };

//     return (
//         <div className="main">
//             <h1>Lista de Tarefas</h1>
//             <div className="button-new-task-container">
//                 <button onClick={() => handleNew()} >Nova Tarefa</button>
//             </div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Id</th>
//                         <th>Descrição</th>
//                         <th>Ações</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tasks.map((task) => (
//                         <tr key={task.id}>
//                             <td>{task.id}</td>
//                             <td>{task.description}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(task.id)}>Editar</button>
//                                 <button onClick={() => handleDelete(task.id)}>Excluir</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="load-button-container">
//                 {loading ? (
//                     <p>Carregando...</p>
//                 ) : (
//                     <button onClick={loadMore}>Carregar mais</button>
//                 )}
//             </div>
//             <Modal
//                 className="modal"
//                 ariaHideApp={false}
//                 isOpen={modalIsOpen}
//                 onRequestClose={handleCloseModal}
//             >
//                 <h2>{currentTaskId ? "Editar Tarefa" : "Nova Tarefa"}</h2>
//                 <TaskForm
//                     id={currentTaskId}
//                     onSave={handleSave}
//                     />
//             </Modal>
//             <ToastContainer />
//         </div>
//     );
// };

// export default TaskList;

import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import TaskService from '../service/TaskService';
import TaskForm from './TaskForm';
import './../style/style.css';

const TaskList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            // Simulação de busca de dados, substitua pela sua lógica de busca de tarefas
            //const data = await TaskService.fetchTasks(page, 4);
            const data = []; // Substitua por sua lógica de busca
            if (page === 1) {
                setTasks(data);
            } else {
                setTasks([...tasks, ...data]);
            }
        } catch (error) {
            toast.error('Erro ao buscar tarefas!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [page, tasks]); // Adicionado tasks como dependência

    useEffect(() => {
        fetchTasks();
    }, [page, fetchTasks]); // Adicionado fetchTasks como dependência

    const loadMore = () => {
        setPage(page + 1);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleNew = () => {
        setModalIsOpen(true);
        setCurrentTaskId(0);
    };

    const handleEdit = (id) => {
        setCurrentTaskId(id);
        setModalIsOpen(true);
    };

    const handleDelete = (id) => {
        TaskService.deleteTask(id)
            .then(() => {
                fetchTasks();
                toast.success('Tarefa excluída com sucesso!');
            })
            .catch((err) => { // Corrigido de .ctach para .catch
                console.log(err);
                toast.error('Erro ao excluir tarefa!');
            });
    };

    const handleSave = async () => {
        handleCloseModal();
        toast.success('Dados atualizados com sucesso!');
        setPage(1);
        await fetchTasks();
    };

    return (
        <div className="main">
            <h1>Lista de Tarefas</h1>
            <div className="button-new-task-container">
                <button onClick={handleNew}>Nova Tarefa</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.description}</td>
                            <td>
                                <button onClick={() => handleEdit(task.id)}>Editar</button>
                                <button onClick={() => handleDelete(task.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="load-button-container">
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <button onClick={loadMore}>Carregar mais</button>
                )}
            </div>
            <Modal
                className="modal"
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
            >
                <h2>{currentTaskId ? "Editar Tarefa" : "Nova Tarefa"}</h2>
                <TaskForm id={currentTaskId} onSave={handleSave} />
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default TaskList;