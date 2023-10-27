import { defineStore } from 'pinia'

export const useUserBlogStore = defineStore('userBlog', {
  state: () => ({
    userRecords: [],
    userRecordItem: {},
    userRecordItemComments: [],
    isVisibleFormAddRecord: false,
    id: 0
  }),

  actions: {
    addNewRecord(record) {
      this.userRecords.push(record)
      localStorage.setItem('userRecoreds', JSON.stringify(this.userRecords))
    },
    deleteRecord(record) {
      this.userRecords = this.userRecords.filter((e) => e.id !== record.id)
    },
    updateRecord(record) {
      this.userRecords = this.userRecords.map((item) => {
        if (item.id == record.id) {
          item = record
          return item
        } else {
          return item
        }
      })
      this.userRecordItemComments = record.comments
      this.userRecordItem = record

      localStorage.setItem('userRecordItem', JSON.stringify(this.userRecordItem))
      localStorage.setItem('userRecoreds', JSON.stringify(this.userRecords))
    },
    formatDate(inputDate) {
      const dateParts = inputDate.split('-')

      const yearValue = dateParts[0]
      const monthValue = dateParts[1]
      const dayValue = dateParts[2]

      const formattedDate = `${dayValue}.${monthValue}.${yearValue}`
      return formattedDate
    }
  }
})
