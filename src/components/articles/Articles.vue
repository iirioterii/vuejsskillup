<template>
  <div class="articles">
    <div class="title-2">
      <h1>{{ header }}</h1>
    </div>

    <article-grid
        :loading="loading"
        :table-data="tableData"
        :on-add-clicked="onAddClicked"
        :on-edit-clicked="onEditClicked"
        :on-remove-clicked="onRemoveClicked"
    ></article-grid>

    <el-dialog
        :title="getArticleFormTitle"
        :visible.sync="articleFormVisible"
        v-if="articleFormVisible"
        width="30%"
        :before-close="handleClose"
    >
      <article-form
          :on-submit-success="onSubmitSuccess"
          :id="id"
          :title="title"
          :description="description"
          :text="text"
          :add="articleFormAdd"
      ></article-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getArticles, removeArticle, getArticle } from '../../services/api';
  import { getArticlesDataFromJsonApi, getEntityDataFromJsonApiResponse } from '../../services/normalizers';
  import ArticleForm from './ArticleForm';
  import ArticleGrid from './ArticleGrid';

  export default {
    components: {
      ArticleForm,
      ArticleGrid,
    },
    data() {
      return {
        title: '',
        description: '',
        text: '',
        id: '',
        header: 'Articles',
        articleFormAdd: true,
        articleFormVisible: false,
        loading: false,
        tableData: [],
      };
    },
    computed: {
      getArticleFormTitle() {
        if (this.articleFormAdd) {
          return 'New Article';
        }
        return 'Edit Article';
      },
    },
    methods: {
      onSubmitSuccess(article) {
        this.articleFormVisible = false;
        this.loading = true;
        if (this.articleFormAdd) {
          this.tableData.push(getEntityDataFromJsonApiResponse(article));
        } else {
          this.tableData = this.tableData.map((item) => {
            if (item.id === this.id) {
              return getEntityDataFromJsonApiResponse(article);
            }
            return item;
          });
        }
        this.loading = false;
      },
      onRemoveClicked(row) {
        this.$confirm('Are you sure to remove article?')
          .then(() => {
            this.loading = true;
            removeArticle(row.id)
              .then(() => {
                this.tableData = this.tableData.filter(item => (item.id !== row.id));
                this.$notify({
                  title: 'Remove successfully',
                  text: 'You are successfully removed article',
                  type: 'success',
                });
              })
              .catch((err) => {
                if (err.response.status === 403) {
                  this.$notify({
                    title: 'Remove failed',
                    text: 'Sorry! You don\'t have enough permissions',
                    type: 'error',
                  });
                }
                // Handle errors
              })
              .finally(() => this.loading = false);
          })
          .catch(() => {});
      },
      onEditClicked(row) {
        this.id = row.id;
        this.articleFormAdd = false;
        this.loading = true;
        getArticle(row.id)
          .then((article) => {
            this.title = article.data.attributes.title;
            this.description = article.data.attributes.description;
            this.text = article.data.attributes.text;
            this.articleFormVisible = true;
          })
          .finally(() => this.loading = false);
      },
      onAddClicked() {
        this.articleFormVisible = true;
      },
      handleClose(done) {
        this.title = '';
        this.description = '';
        this.text = '';
        this.articleFormAdd = true;
        done();
      },
    },
    mounted() {
      this.loading = true;
      getArticles()
        .then(response => this.tableData = getArticlesDataFromJsonApi(response))
        .finally(() => this.loading = false);
    },
  };

</script>

<style>
  .title-2 {
    text-align: center;
  }
</style>
