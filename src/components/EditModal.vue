<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="updateTask">
          <h1>Edit Modal</h1>
        <div class="field">
          <label class="label">Task Title</label>
          <div class="control">
            <input
              v-model="title"
              class="input"
              type="text"
              placeholder="Enter task"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              v-model="description"
              class="textarea"
              placeholder="Textarea"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">Assigned By</label>
          <div class="control">
            <input
              v-model="createdBy"
              class="input"
              type="text"
              placeholder="Enter Assigner's name"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Assigned To</label>
          <div class="control">
            <input
              v-model="assignedTo"
              class="input"
              type="text"
              placeholder="Enter task creator's name"
            />
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control" @click="closeModal">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { TaskItem } from '@/store/state'
import { MutationType } from '@/store/mutations'
export default {
  name: 'EditModal',
  props: {
      id: { type: Number, required: true }
  },
  setup(props: any) {
    const state = reactive({
      title: '',
      description: '',
      createdBy: '',
      assignedTo: ''
    })
    const store = useStore()

    const getTaskById = computed(() => store.getters.getTaskById(Number(props.id)))
    console.log("task by id", getTaskById)



    const setFields = () => {
       const task = store.getters.getTaskById(Number(props.id))
       if(task) {
           console.log("task si kolo", task)
           state.title = task.title
           state.createdBy = task.createdBy
           state.assignedTo = task.assignedTo
           state.description = task.description
       }
    }

    onMounted(() => { setFields() });

    const updateTask = () => {
      if (
        state.title === '' ||
        state.description === '' ||
        state.createdBy === '' ||
        state.assignedTo === ''
      )
        return

      const task: TaskItem = {
        id: props.id,
        title: state.title,
        description: state.description,
        createdBy: state.createdBy,
        assignedTo: state.assignedTo,
        completed: false,
        editing: false
      }
      store.commit(MutationType.UpdateTask, task)
      state.title = ''
      state.createdBy = ''
      state.assignedTo = ''
      state.description = ''
    }

    const closeModal = () => {
      store.commit(MutationType.SetEditModal, {showModal: false, taskId: undefined})
    }

    return { closeModal, ...toRefs(state), updateTask }
  }
}
</script>
<style scoped>
label {
    color: #ffffff;
}
h1 {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}
</style>