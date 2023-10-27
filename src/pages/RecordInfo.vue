<template>
  <div class="main_container_info">
    <RouterLink to="/" class="btn_back">Назад</RouterLink>
    <div class="info_record_container">
      <header>
        <label style="outline: none">Название: </label>
        <div class="validationMessage">{{ validationMessageForName }}</div>
        <input
          type="text"
          class="label texarea_style"
          v-model="nameRecord"
          :class="[{ disabled: isDisabled }, { editRecordInfo: isEdit }]"
          @input="validateTextName"
        />
      </header>
      <main class="main_container">
        <label class="lable_shortDes">Краткое описание: </label>
        <div class="validationMessage">{{ validationMessageForShortDescription }}</div>
        <textarea
          class="texarea_style"
          :class="[{ disabled: isDisabled }, { editRecordInfo: isEdit }]"
          v-model="shortDescription"
          @input="validateTextShortDescription"
        ></textarea>
        <label>Полное описание: </label>
        <div class="validationMessage">{{ validationMessageForFullDescription }}</div>
        <textarea
          class="main_container_fullDes texarea_style"
          :class="[{ disabled: isDisabled }, { editRecordInfo: isEdit }]"
          v-model="fullDescription"
          @input="validateTextFullDescription"
        ></textarea>
        <div class="date">{{ date }}</div>

        <button class="btn_edit" v-if="isVisibleBtn == true" @click="editRecordInfo">
          Редактировать
        </button>
        <button class="btn_save" v-else @click="updateRecordInfo">Сохранить</button>
      </main>
    </div>
    <div class="comments_container">
      <label class="label_comments">Комментарии: </label>
      <div v-for="comment of userBlog.userRecordItemComments" :key="comment.id">
        <ListComment :comment="comment" />
      </div>
      <FormAddComment />
    </div>
  </div>
</template>

<script>
import { useUserBlogStore } from '../stores/userBlog'
import ListComment from '../components/ListComment.vue'
import FormAddComment from '../components/FormAddComment.vue'
export default {
  components: {
    ListComment,
    FormAddComment
  },
  data() {
    return {
      record: '',
      nameRecord: '',
      shortDescription: '',
      fullDescription: '',
      date: '',
      isDisabled: true,
      isEdit: false,
      isVisibleBtn: true,
      comments: [],

      validationMessageForName: '',
      validationMessageForShortDescription: '',
      validationMessageForFullDescription: ''
    }
  },
  setup() {
    const userBlog = useUserBlogStore()
    return {
      userBlog
    }
  },
  methods: {
    validateTextName() {
      if (this.nameRecord.length > 50) {
        this.nameRecord = this.nameRecord.slice(0, 50)
        this.validationMessageForName = 'Название не должно превышать 50 символов'
      } else {
        this.validationMessageForName = ''
      }
    },
    validateTextShortDescription() {
      if (this.shortDescription.length > 100) {
        this.shortDescription = this.shortDescription.slice(0, 100)
        this.validationMessageForShortDescription =
          'Короткое описание не должно превышать 100 символов'
      } else {
        this.validationMessageForShortDescription = ''
      }
    },
    validateTextFullDescription() {
      if (this.fullDescription.length > 255) {
        this.fullDescription = this.fullDescription.slice(0, 255)
        this.validationMessageForFullDescription =
          'Полное описание не должно превышать 255 символов'
      } else {
        this.validationMessageForFullDescription = ''
      }
    },

    editRecordInfo() {
      this.isDisabled = false
      this.isVisibleBtn = false
      this.isEdit = true
    },
    updateRecordInfo() {
      const date = new Date().toISOString().split('T')[0]

      if (
        (this.nameRecord.replace(/\s+/g, '') !== '') &
        (this.shortDescription.replace(/\s+/g, '') !== '')
      ) {
        const createdRecord = {
          id: this.record.id,
          nameRecord: this.nameRecord,
          shortDescription: this.shortDescription,
          fullDescription: this.fullDescription,
          dateCreation: date,
          comments: this.userBlog.userRecordItemComments
        }

        this.userBlog.updateRecord(createdRecord)

        this.isDisabled = true
        this.isVisibleBtn = true
        this.isEdit = false
        this.validationMessageForName = ''
        this.validationMessageForShortDescription = ''
      } else {
        if (this.nameRecord.replace(/\s+/g, '') == '') {
          this.validationMessageForName = 'Это поле должно быть заполнено'
        }
        if (this.shortDescription.replace(/\s+/g, '') == '') {
          this.validationMessageForShortDescription = 'Это поле должно быть заполнено'
        }
      }
    },
    back() {
      this.window.location.href = '/'
    }
  },
  mounted() {
    if (localStorage.getItem('userRecoreds') !== null) {
      this.userBlog.userRecords = JSON.parse(localStorage.getItem('userRecoreds'))
    }
    if (localStorage.getItem('userRecordItem') !== null) {
      this.userBlog.userRecordItem = JSON.parse(localStorage.getItem('userRecordItem'))
    }
    this.userBlog.userRecordItemComments = this.userBlog.userRecordItem.comments
    this.record = this.userBlog.userRecordItem
    this.nameRecord = this.record.nameRecord
    this.shortDescription = this.record.shortDescription
    this.fullDescription = this.record.fullDescription
    this.date = this.userBlog.formatDate(this.record.dateCreation)

    this.comments = this.userBlog.userRecordItemComments
  }
}
</script>

<style scoped>
.main_container_info {
  display: flex;
  flex-direction: column;
}
.info_record_container,
.comments_container {
  display: flex;
  flex-direction: column;
  width: 60vw;
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 0 1vh;
  margin-top: 1%;
  margin-left: 50%;
  transform: translate(-50%);
  background-color: rgba(240, 248, 255, 0.5);
}
.btn_back {
  text-decoration: none;
  color: black;
  border: 1px solid black;
  border-radius: 12px;
  width: 12vh;
  font-size: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
  margin-left: 19%;
  transform: translate(3%);
}
.btn_back:hover {
  background-color: rgb(206, 232, 255);
}
.label {
  width: 100%;
  font-size: 2.5vh;
}
.main_container {
  display: flex;
  flex-direction: column;
}
.texarea_style {
  resize: none;
  background: none;
  border: none;
  font-size: 2vh;
}

.main_container_fullDes {
  height: 15vw;
}
.date {
  width: 100%;
  display: flex;
  justify-content: end;
  padding-right: 20vh;
  font-size: 2vh;
}
.disabled {
  pointer-events: none;
}
.editRecordInfo {
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 12px;
}
.validationMessage {
  color: red;
}
.btn_edit {
  border: none;
  background: none;
  font-size: 2vh;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  margin: 1vh 0;
}
.btn_edit:hover {
  background-color: rgb(206, 232, 255);
}
.btn_save {
  border: none;
  background: none;
  font-size: 2vh;
  border: 1px solid rgba(255, 0, 0, 0.3);
  background-color: rgba(255, 0, 0, 0.159);
  border-radius: 5px;
  margin: 1vh 0;
}
.btn_save:hover {
  background-color: rgb(206, 232, 255);
}
.label_comments {
  width: 100%;
  /* border-bottom: 1px solid black; */
  font-size: 2vh;
  margin: 2vh 0;
}
.lable_shortDes {
  margin-top: 2vh;
}
</style>
