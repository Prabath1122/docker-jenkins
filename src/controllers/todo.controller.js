import prisma from "./../config/prisma.js";




//get all tasks
export const getTodos = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                deleted: false
            }
        });
        res.status(200).json({
            success: true,
            data: todos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// create task 
export const addTodo = async (req, res) => {
    const { task, status } = req.body;

    try {
        const todo = await prisma.todo.create({
            data: {
                task,
                status
            }
        })
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: todo
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete task
export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Task id is required"
        });
    }

    try {
        const isexistorDeletes = await prisma.todo.findUnique({
            where: {
                id: id,
                deleted: false
            }
        })

        if (!isexistorDeletes) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const deleteTask = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                deleted: true,
            }
        })

        if (!deleteTask) {
            return res.status(500).json({
                success: false,
                message: "Task not deleted"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: deleteTask
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// get single record
export const getSingleTodo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Task id is required"
        });
    }

    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
                deleted: false
            }
        })

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// updateTodo
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { task, status } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Task id is required"
        });
    }

    try {
        const isexistorUpdates = await prisma.todo.findUnique({
            where: {
                id: id,
                deleted: false
            }
        });

        if (!isexistorUpdates) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                task,
                status
            }
        });

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTodo
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}