import { defineStore } from 'pinia';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy, limit, startAfter } from 'firebase/firestore';

export interface Todo {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    currentPage: 1 as number,
    perPage: 2 as number,
    lastVisible: null as any,
  }),
  actions: {
    async fetchTodos() {
      try {
        const { $db } = useNuxtApp();
        const todosCollection = collection($db, 'todos');
        
        // Default query for the first page
        let todosQuery = query(
          todosCollection,
          orderBy("createdAt", "desc"), // Sort by createdAt descending
          limit(this.perPage.value)           // Limit to `perPage` todos
        )

        // If it's not the first page, apply `startAfter` with the last document
        if (this.currentPage.value > 1 && this.lastVisible.value) {
          todosQuery = query(
            todosCollection,
            orderBy("createdAt", "desc"),
            limit(this.perPage.value),
            startAfter(this.lastVisible.value) // Start after the last visible doc
          )
        }
        
        const snapshot = await getDocs(todosQuery)

        // Map the snapshot to todos and sort if needed
        const todosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        // Update todos state
        this.todos = todosData

        // Update the last visible document for pagination
        this.lastVisible = snapshot.docs[snapshot.docs.length - 1]
      } catch (error) {
        console.error('Error getting documents: ', error );
      }
    },

    async addTodo(title: string, description: string) {
      try {
        const { $db } = useNuxtApp();
        const todosCollection = collection($db, 'todos');
        const newTodo: Todo = { 
          title, 
          description, 
          completed: false, 
          createdAt: new Date(), 
          updatedAt: new Date() 
        };
        const docRef = await addDoc(todosCollection, newTodo);
        this.todos = [{ ...newTodo, id: docRef.id }, ...this.todos];
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    },

    async updateTodo(id: string, updatedData: Partial<Todo>) {
      try {
        const { $db } = useNuxtApp();
        const todoDoc = doc($db, 'todos', id);
        const dataToUpdate = {
          ...updatedData,
          updatedAt: new Date(),
        }

        await updateDoc(todoDoc, dataToUpdate);
        const todoIndex = this.todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
          this.todos[todoIndex] = { ...this.todos[todoIndex], ...dataToUpdate };
        }
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    },

    async deleteTodo(id: string) {
      try {
        const { $db } = useNuxtApp();
        const todoDoc = doc($db, 'todos', id);
        await deleteDoc(todoDoc);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    },

    async nextPage() {
      this.currentPage.value++
      await this.fetchTodos()
    },

    async prevPage() {
      if (this.currentPage.value > 1) {
        this.currentPage.value--
        await this.fetchTodos()
      }
    },
  },
});
