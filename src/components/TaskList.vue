<template>
  <table class="table">
    <thead>
      <tr>
        <th><abbr title="Position">Task Id</abbr></th>
        <th>Completed</th>
        <th>Task</th>
        <th><abbr title="Won">Created By</abbr></th>
        <th><abbr title="Drawn">Assigned To</abbr></th>
        <th><abbr title="Lost">Actions</abbr></th>
      </tr>
    </thead>
    <tbody v-if="tasks">
      <tr v-for="task in tasks" :key="task.id">
        <TaskListItem  v-bind="task" />
      </tr>
    </tbody>
    <tfoot>
      <CreateModal v-show="showCreateModal"></CreateModal>
      <button class="button is-link" @click="setModal">Create Task</button>
    </tfoot>
  </table>
  <EditModal v-if="showEditModal" :id="editTaskId"></EditModal>
  <TaskItem v-if="showTaskModal" :id="showTaskId"></TaskItem>
</template>
<script>
import CreateModal from './CreateModal'
import EditModal from './EditModal'
import TaskItem from './TaskItem'
import TaskListItem from './TaskListItem'
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
export default defineComponent({
  name: 'Table',
  components: {
    CreateModal,
    TaskListItem,
    TaskItem,
    EditModal
  },
  setup() {
    const store = useStore()

    const setModal = () => {
      store.commit(MutationType.SetCreateModal, true)
    }

    const showCreateModal = computed(() => store.state.showCreateModal)
    const showEditModal = computed(() => store.state.showEditModal)
    const editTaskId = computed(() => store.state.editModalTaskId)
    const showTaskModal = computed(() => store.state.showTaskModal)
    const showTaskId = computed(()=> store.state.showTaskId)

    const tasks = computed(() => {console.log(store.state.tasks); return store.state.tasks})
    console.log({ tasks })
    return { showCreateModal, setModal, tasks, showEditModal,showTaskModal, editTaskId, showTaskId }
  }
})
</script>
<style scoped>  
table {
  width: 100%;
}
.fa {
  font-size: 1.2rem;
  margin-left: 15px;
}
.fa:hover {
  font-size: 1.4rem;
}
</style>
