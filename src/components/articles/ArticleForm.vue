<template>
  <el-form v-loading="loading">

    <el-form-item label="Title">
      <el-input
          name="title"
          v-model="formData.title"
          v-validate="'required|max:255'"
      ></el-input>
      <i v-show="errors.has('title')" class="fa fa-warning"></i>
      <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
    </el-form-item>

    <el-form-item label="Description">
      <el-input
          name="description"
          type="textarea"
          v-model="formData.description"
          v-validate="'required|min:20|max:500'"
      ></el-input>
      <i v-show="errors.has('description')" class="fa fa-warning"></i>
      <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
    </el-form-item>

    <el-form-item label="Text">
      <el-input
          name="text"
          type="textarea"
          v-model="formData.text"
          v-validate="'required'"
      ></el-input>
      <i v-show="errors.has('text')" class="fa fa-warning"></i>
      <span v-show="errors.has('text')" class="help is-danger">{{ errors.first('text') }}</span>
    </el-form-item>

    <el-button type="primary" :disabled="isFormInvalid" @click="validateBeforeSubmit">Create</el-button>

  </el-form>
</template>

<script>
  import ElForm from 'element-ui/packages/form/src/form';
  import ElFormItem from 'element-ui/packages/form/src/form-item';
  import ElInput from 'element-ui/packages/input/src/input';
  import set from 'lodash/set';
  import { postArticle, updateArticle } from '../../services/api';

  export default {
    name: 'article-form',
    props: {
      onSubmitSuccess: {
        type: Function,
      },
      id: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      text: {
        type: String,
      },
      add: {
        type: Boolean,
      },
    },
    computed: {
      isFormInvalid() {
        return Object.keys(this.veeFields).some(key => this.veeFields[key].invalid);
      },
    },
    data() {
      return {
        loading: false,
        formData: {
          title: this.title,
          description: this.description,
          text: this.text,
          id: this.id,
        },
      };
    },
    components: {
      ElInput,
      ElFormItem,
      ElForm,
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator
          .validateAll()
          .then((isValid) => {
            if (isValid) {
              this.loading = true;
              const data = {
                data: {
                  type: 'articles',
                  attributes: {
                    title: this.$data.formData.title,
                    description: this.$data.formData.description,
                    text: this.$data.formData.text,
                  },
                },
              };
              if (this.add) {
                // Add new article
                postArticle(data)
                  .then(response => this.onSubmitSuccess(response))
                  .finally(() => this.loading = false);
              } else {
                // Edit article
                updateArticle(this.id, set(data, 'data.id', this.id))
                  .then(response => this.onSubmitSuccess(response))
                  .finally(() => this.loading = false);
              }
            }
          });
      },
    },
  };
</script>

<style scoped>

</style>