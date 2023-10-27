<template>
  <RouterLink to="RecordInfo" class="item_blog" @click="openRecordItem">
    <div>{{ this.index + 1 }}</div>
    <div class="item_blog_content">
      <div class="nameWrap">{{ name }}{{ endingText }}</div>
      <div class="textWrap">{{ record.shortDescription }}{{ endingText }}</div>
      <div class="count_comment">Комментарии: {{ record.comments.length }}</div>
      <div class="date">{{ date }}</div>
      <button class="btn_delete_record" @click.prevent="deleteRecord"><img :src="Delete" /></button>
    </div>
  </RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router'
import { useUserBlogStore } from '../stores/userBlog'

import Delete from '../assets/icons/delete.svg'
export default {
  components: { RouterLink },
  props: {
    record: {
      record: Object
    },
    index: {
      index: Number
    }
  },
  setup() {
    const userBlog = useUserBlogStore()
    return {
      userBlog
    }
  },
  data() {
    return {
      Delete: Delete,
      name: '',
      endingText: '',
      shortDescription: '',
      date: ''
    }
  },
  methods: {
    openRecordItem() {
      this.userBlog.userRecordItem = this.record
      this.userBlog.userRecordItemComments = this.record.comments

      localStorage.setItem('userRecordItem', JSON.stringify(this.userBlog.userRecordItem))
    },
    deleteRecord() {
      this.userBlog.deleteRecord(this.record)
    }
  },
  mounted() {
    if (this.record.nameRecord.length >= 30) {
      this.name = this.record.nameRecord.split('').slice(0, 30).join('')
      this.endingText = '...'
    } else {
      this.name = this.record.nameRecord
    }
    if (this.record.shortDescription.length >= 50) {
      this.shortDescription = this.record.shortDescription.split('').slice(0, 50).join('')
    } else {
      this.shortDescription = this.record.shortDescription
    }

    this.date = this.userBlog.formatDate(this.record.dateCreation)
  }
}
</script>

<style scoped>
.item_blog {
  text-decoration: none;
  padding: 0 1vh;
  display: flex;
  align-items: center;
  color: black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.item_blog:hover {
  background-color: rgba(169, 169, 169, 0.2);
}
.item_blog_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 3vh;
}
.nameWrap {
  width: 10vw;
  height: 5vh;
  word-break: break-all;
  display: flex;
  align-items: center;
}
.textWrap {
  width: 30vw;
  word-break: break-all;
  display: flex;
  align-items: center;
}
.date {
  display: flex;
}
.count_comment {
  display: flex;
  justify-content: center;
  width: 20%;
}

.btn_delete_record {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
}
img:hover {
  background-color: rgba(50, 144, 185, 0.591);
  border-radius: 5px;
}
</style>
