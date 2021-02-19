<template>
  <div class="showForm">
    <Form
      :model="showForm"
      v-model="showForm"
      ref="showForm"
      @submit.native.prevent
      :label-width="100"
      :show-message="false"
    >
      <div>
        <FormItem
          v-for="(item, index) in items"
          :label="item.label"
          :prop="item.key"
          :key="index"
          :rules="{
            required: item.required,
            triggle: item.type === 'input' || item.type === 'textarea' ? 'blur' : 'change',
            max: item.max,
            min: item.min,
            type: item.var_type || 'string',
            pattern: item.pattern
          }"
        >
          <span
            v-if="item.type === 'delete'"
            style="text-align: center; font-size: 16px;"
          >{{item.placeholder}}</span>
          <Input
            type="text"
            v-else-if="item.type === 'input'"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :prop="item.key"
            :maxlength="item.max"
            v-model="showForm[item.key]"
            clearable
            style="width: 350px;"
          />
          <Input
            v-else-if="item.type === 'textarea'"
            type="textarea"
            :autosize="true"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :prop="item.key"
            :maxlength="item.max"
            v-model="showForm[item.key]"
            style="width: 350px;"
          />
          <Select
            v-else-if="item.type === 'select'"
            v-model="showForm[item.key]"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :multiple="item.multiple"
            clearable
            filterable
            style="width: 180px;"
            @on-change="selectChangeHandler($event, item.key)"
          >
            <Option
              v-for="childItem in item.opts"
              :key="childItem.key"
              :value="childItem.key"
              :label="childItem.label"
            ></Option>
          </Select>
          <template v-if="item.type === 'radio'">
            <RadioGroup
              v-model="showForm[item.key]"
              style="margin-bottom: 20px;"
              @on-change="radioChangeHandler"
            >
              <Radio :label="v.label" v-for="(v, k) in item.list" :key="'radio_comp_' + k">
                <span>{{ v.value }}</span>
              </Radio>
            </RadioGroup>
          </template>
          <Transfer
            v-else-if="item.type === 'transfer'"
            filterable
            v-model="showForm[item.key]"
            :data="has_action"
            :target-keys="no_action"
            :filter-method="filterMethod"
            @on-change="handleChange"
            :titles="item.title"
          ></Transfer>
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'ModalForm',
  data () {
    return {
      showForm: {}, // 表单绑定数据
      has_action: [], // 已分配的权限
      no_action: [], // 未分配的权限
      accssKey: ''
    }
  },
  props: {
    value: Object,
    items: Array,
    title: {
      type: String,
      default () {
        return ''
      }
    }
  },
  model: {
    event: 'click'
  },
  watch: {
    // 监听items,当items发生改变时,执行代码
    items: {
      handler (val, oldVal) {
        // value是当前行的数据
        if (this.value) {
          let formData = this.value
          let formResult = {}
          if (val) {
            val.forEach(item => {
              if (item.key === 'departments') {
                formResult[item.key] = formData['department_id']
              } else if (item.key === 'roles') {
                formResult[item.key] = formData['role_id']
              } else {
                formResult[item.key] = formData[item.key]
              }
            })
          }
          this.showForm = { ...formResult }
        }
        if (val) {
          val.forEach(item => {
            if (item.type === 'transfer') {
              this.accssKey = item.key
              this.has_action = []
              this.no_action = []
              this.has_action = [].concat(item.has_action, item.no_action)
              let arr = item.no_action
              arr.forEach(childItem => {
                this.no_action.push(childItem.key)
              })
            }
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    selectChangeHandler (event, key) {
      this.$set(this.showForm, key, event)
    },
    // 表单上传
    submit () {
      let data = {}
      this.$refs.showForm.validate(valid => {
        if (valid) {
          let key = this.accssKey
          let noArr = []
          if (key) {
            this.has_action.forEach(item => {
              if (this.no_action.indexOf(item.key) < 0) {
                noArr.push(item.key)
              }
            })
            // 请求数据拼接
            this.$set(this.showForm, 'has_action', noArr)
            this.$set(this.showForm, 'no_action', this.no_action)
          }
          data = Object.assign({}, this.showForm)
          // 把字段value改为数组
          if (data.departments) {
            let departmentsArr = []
            departmentsArr.push(data['departments'])
            data['departments'] = departmentsArr

            let roleArr = []
            roleArr.push(data['roles'])
            data['roles'] = roleArr
          }
          data = Object.assign({}, data)
        }
      })
      return data
    },
    reset () {
      this.has_action = []
      this.no_action = []
      // 清空表单
      this.$refs.showForm.resetFields()
    },
    handleReset () {
      this.has_action = []
      this.no_action = []
      this.$refs.showForm.resetFields()
      this.$nextTick(() => {
        this.$emit('on-cancel')
      })
    },
    // 穿梭框-搜索
    filterMethod (data, query) {
      return data.label.indexOf(query) > -1
    },
    handleChange (newTargetKeys) {
      this.no_action = newTargetKeys
    },
    uploadFileOptions (item) {
      let time = new Date().getTime()
      return {
        target: item.url, // 目标上传url
        chunkSize: 300 * 1024 * 1024, // 分块大小
        maxChunkRetries: 3, // 最大自动失败重试上传次数
        testChunks: false,
        generateUniqueIdentifier: function (file) {
          let uniqueStr = file.name.split('.')[0] + '_' + time
          return uniqueStr
        }
      }
    }
  },
  mounted () {
    this.items &&
      this.items.forEach((item, index) => {
        this.$set(this.showForm, item.key, item[item.key])
      })
  }
}
</script>
<style scoped lang="less">
.showForm {
  & /deep/ .ivu-form-item {
    margin-bottom: 20px;

    .ivu-input-wrapper {
      /* height: 32px; */
      font-size: 12px;

      textarea.ivu-input {
        height: 30px;
        font-size: 12px;
        line-height: 1.8;
      }
    }

    .ivu-input-disabled {
      background-color: transparent;
      color: #515a6e;
      cursor: default;
    }
    .validate-disabled .ivu-input {
      border: 1px solid #dcdee2;
      transition: border 0.2s ease-in-out;
    }
    .validate-disabled-none .ivu-input {
      border: 1px solid #ed4014;
      transition: border 0.2s ease-in-out;
    }
    .ivu-transfer {
      margin-top: 10px;
      left: -80px;
      width: 610px;

      .ivu-transfer-list {
        width: 270px;
        height: 365px;
      }

      .ivu-transfer-list:nth-of-type(2) {
        right: 0;
      }

      .ivu-transfer-operation {
        .ivu-btn {
          width: 30px;
          width: 30px;
          overflow: hidden;
          height: 30px;
          line-height: 30px;
          padding: 0;
          border: none;

          span {
            line-height: 30px;
            width: 30px;
            height: 30px;
            display: block;
            margin-top: -3px;

            span {
              width: 0;
              height: 0;
            }

            .ivu-icon {
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
        .ivu-btn[disabled] {
          cursor: pointer;
        }
        .ivu-btn:active,
        .ivu-btn:focus,
        .ivu-btn:hover {
          background-color: #155ffc;
          border-color: #155ffc;
          .ivu-icon {
            color: #fff;
          }
        }
        .ivu-btn-primary {
          background-color: #dcdfe6;
          border-color: #dcdee2;
          .ivu-icon {
            color: #979797;
          }
        }
        .ivu-btn:nth-of-type(2) {
          span {
            margin-left: 1px;
          }
        }
      }
    }
  }
  .tips-btn {
    margin-left: 10px;
    cursor: pointer;
  }
  .submit-btn {
    margin-right: -20px;
    padding-bottom: 30px;
    padding-top: 5px;

    .ivu-btn {
      float: right;
    }
  }
  .clear {
    clear: both;
  }
}
</style>
