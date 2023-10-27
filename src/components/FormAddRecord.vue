<template>
  <form class="form_add_record_container">
    <button class="btn_close_form" @click.prevent="closeForm">X</button>
    <div class="lable_add_record">Создание записи</div>
    <label class="name_style">Название: </label>
    <div class="validationMessage">{{ validationMessageForName }}</div>
    <input class="input_name_record" type="text" v-model="nameRecord" @input="validateTextName" />
    <label>Краткое описание: </label>
    <div class="validationMessage">{{ validationMessageForShortDescription }}</div>
    <textarea
      class="short_textarea_style"
      v-model="shortDescription"
      @input="validateTextShortDescription"
    ></textarea>
    <label>Полное описание: </label>
    <div class="validationMessage">{{ validationMessageForFullDescription }}</div>
    <textarea
      class="full_textarea_style"
      v-model="fullDescription"
      @input="validateTextFullDescription"
    ></textarea>
    <button class="btn_create_record" @click.prevent="createRecord">Создать</button>
  </form>
</template>

<script>
import { useUserBlogStore } from '../stores/userBlog'
export default {
  data() {
    return {
      nameRecord: '',
      shortDescription: '',
      fullDescription: '',
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
    closeForm() {
      this.userBlog.isVisibleFormAddRecord = false
    },
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
        this.validationMessageForFullDescription = ''
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
    createRecord() {
      const date = new Date().toISOString().split('T')[0]
      this.userBlog.id += 1

      if (
        (this.nameRecord.replace(/\s+/g, '') !== '') &
        (this.shortDescription.replace(/\s+/g, '') !== '')
      ) {
        const createdRecord = {
          id: this.userBlog.id,
          nameRecord: this.nameRecord,
          shortDescription: this.shortDescription,
          fullDescription: this.fullDescription,
          dateCreation: date,
          comments: []
        }
        this.userBlog.addNewRecord(createdRecord)

        this.nameRecord = ''
        this.shortDescription = ''
        this.fullDescription = ''
        this.validationMessageForName = ''
        this.validationMessageForShortDescription = ''

        this.userBlog.isVisibleFormAddRecord = false
      } else {
        if (this.nameRecord.replace(/\s+/g, '') == '') {
          this.validationMessageForName = 'Это поле должно быть заполнено'
        }
        if (this.shortDescription.replace(/\s+/g, '') == '') {
          this.validationMessageForShortDescription = 'Это поле должно быть заполнено'
        }
      }
    }
  }
}
</script>

<style scoped>
.form_add_record_container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 40vw;
  background-color: aliceblue;
  margin-left: 50%;
  transform: translate(-50%);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 0 1vh;
}
.input_name_record {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.short_textarea_style {
  resize: none;
  height: 15vh;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.full_textarea_style {
  resize: none;
  height: 30vh;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.validationMessage {
  color: red;
}
.btn_close_form {
  margin-left: 100%;
  transform: translate(-100%);
  width: 2vw;
  border: none;
  background: none;
}
.btn_close_form:hover {
  background-color: rgb(169, 166, 166);
  border-radius: 5px;
}
.name_style {
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.3); */
}
.lable_add_record {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2vh;
}
.btn_create_record {
  border: none;
  background: none;
  font-size: 2vh;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin: 1vh 0;
}
.btn_create_record:hover {
  background-color: rgb(206, 232, 255);
}
</style>
