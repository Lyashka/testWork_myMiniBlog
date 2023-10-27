<template>
  <main class="main_container">
    <FormAddRecordVue v-show="userBlog.isVisibleFormAddRecord" />
    <header class="main_container_header">
      <label>Записи</label>
      <button @click="crateRecord">Добавить</button>
    </header>
    <div v-if="this.userBlog.userRecords.length !== 0">
      <div v-for="(record, index) in userBlog.userRecords" :key="record.id">
        <ItemBlog :record="record" :index="index" />
      </div>
    </div>
    <div style="font-size: 2vh; margin-top: 1vh" v-else>Записей нет</div>
  </main>
</template>

<script>
import FormAddRecordVue from '../components/FormAddRecord.vue'
import ItemBlog from '../components/ItemBlog.vue'
import { useUserBlogStore } from '../stores/userBlog'

export default {
  components: {
    ItemBlog,
    FormAddRecordVue
  },

  data() {
    return {}
  },

  setup() {
    const userBlog = useUserBlogStore()
    return {
      userBlog
    }
  },

  methods: {
    crateRecord() {
      this.userBlog.isVisibleFormAddRecord = true
    }
  },
  mounted() {
    if (localStorage.getItem('userRecoreds') !== null) {
      this.userBlog.userRecords = JSON.parse(localStorage.getItem('userRecoreds'))
    }
  }
}
</script>

<style scoped>
.main_container {
  width: 60vw;
  margin-top: 2%;
  margin-left: 50%;
  transform: translate(-50%);
}
.main_container_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vh;
  font-size: 2vh;
  border-bottom: 1px solid black;
}
</style>
