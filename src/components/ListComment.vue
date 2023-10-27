<template>
  <div class="comment_container">
    <div class="name_commentator">Имя: {{ comment.name }}</div>
    <div class="email_commentator">email: {{ comment.email }}</div>
    <textarea class="comment_commentator" v-model="commentComentator" readonly> </textarea>
  </div>
</template>

<script>
import { useUserBlogStore } from '../stores/userBlog'
export default {
  props: {
    comment: {
      comment: Object
    }
  },
  data() {
    return {
      commentComentator: ''
    }
  },
  setup() {
    const userBlog = useUserBlogStore()
    return {
      userBlog
    }
  },

  mounted() {
    this.commentComentator = `Комментарий: ${this.comment.comment}`
  }
}
</script>

<style scoped>
.comment_container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.name_commentator {
  font-size: 2vh;
}
.email_commentator {
  font-size: 2vh;
}
.comment_commentator {
  margin-top: 1vh;
  resize: none;
  width: 100%;
  min-height: 20vh;
  background: none;
  border: none;
  outline: none;
  font-size: 2vh;
}
</style>
