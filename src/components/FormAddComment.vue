<template>
  <div class="form_add_comment_container">
    <label>Имя: </label>
    <div class="validationMessage">{{ validationMessageForName }}</div>
    <input class="name_commentator" type="text" v-model="name" @input="validateName" />
    <label>Почта: </label>
    <div class="validationMessage">{{ validationMessageForEmail }}</div>
    <input
      class="email_commentator"
      type="email"
      v-model="email"
      @input="validateEmail"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
      title="Введите корректный адрес электронной почты"
    />
    <label>Комментарий: </label>
    <div class="validationMessage">{{ validationMessageForComment }}</div>
    <textarea class="comment_commentator" v-model="comment" @input="validateComment"></textarea>
    <button class="btn_add_comment" @click="addComment">Добавить</button>
  </div>
</template>

<script>
import { useUserBlogStore } from '../stores/userBlog'
export default {
  data() {
    return {
      name: '',
      email: '',
      comment: '',
      validationMessageForName: '',
      validationMessageForEmail: '',
      validationMessageForComment: ''
    }
  },
  // props: {
  //   record: {
  //     record: Object
  //   }
  // },
  setup() {
    const userBlog = useUserBlogStore()
    return {
      userBlog
    }
  },
  methods: {
    validateName() {
      if (this.name.length > 50) {
        this.name = this.name.slice(0, 50)
        this.validationMessageForName = 'Имя не должно превышать 50 символов'
      } else {
        this.validationMessageForName = ''
      }
    },
    validateEmail() {
      if (this.email.length > 50) {
        this.email = this.email.slice(0, 50)
        this.validationMessageForEmail = 'Имя не должно превышать 50 символов'
      } else {
        this.validationMessageForEmail = ''
      }
    },
    validateComment() {
      if (this.comment.length > 255) {
        this.comment = this.comment.slice(0, 255)
        this.validationMessageForComment = 'Полное описание не должно превышать 255 символов'
      } else {
        this.validationMessageForComment = ''
      }
    },
    addComment() {
      // this.record = this.userBlog.userRecordItem
      if (
        (this.name.replace(/\s+/g, '') !== '') &
        (this.email.replace(/\s+/g, '') !== '') &
        (this.comment.replace(/\s+/g, '') !== '')
      ) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (emailPattern.test(this.email)) {
          const newComment = {
            name: this.name,
            email: this.email,
            comment: this.comment
          }
          const updatedRecord = this.userBlog.userRecordItem
          updatedRecord.comments.push(newComment)
          this.userBlog.updateRecord(updatedRecord)

          this.name = ''
          this.email = ''
          this.comment = ''
        } else {
          this.validationMessageForEmail = 'Введите корректный адрес электронной почты'
        }
      } else {
        if (this.name.replace(/\s+/g, '') == '') {
          this.validationMessageForName = 'Это поле должно быть заполнено'
        }
        if (this.email.replace(/\s+/g, '') == '') {
          this.validationMessageForEmail = 'Это поле должно быть заполнено'
        }
        if (this.comment.replace(/\s+/g, '') == '') {
          this.validationMessageForComment = 'Это поле должно быть заполнено'
        }
      }
    }
  }
}
</script>

<style scoped>
.form_add_comment_container {
  display: flex;
  flex-direction: column;
  font-size: 2vh;
}

.btn_add_comment {
  border: none;
  background: none;
  font-size: 2vh;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin: 1vh 0;
}
.btn_add_comment:hover {
  background-color: rgb(206, 232, 255);
}
.validationMessage {
  color: red;
}
.name_commentator {
  font-size: 2vh;
}
.email_commentator {
  font-size: 2vh;
}
.comment_commentator {
  resize: none;
  height: 15vh;
  font-size: 2vh;
}
</style>
