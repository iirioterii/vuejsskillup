<template>
  <data-tables
      v-loading="loading"
      :data="tableData"
      :actions-def="actionsDef"
      :action-col-def="actionColDef"
      :row-key="'id'"
  >
    <el-table-column
        v-for="column in columns"
        :prop="column.prop"
        :label="column.label"
        :key="column.label"
        :formatter="column.formatter"
        sortable="custom"
    >
    </el-table-column>
  </data-tables>
</template>

<script>
  import { formatAuthor, formatDate } from '../../services/tableFormatters';

  export default {
    name: 'article-grid',
    props: {
      loading: {
        type: Boolean,
      },
      tableData: {
        type: Array,
        default() {
          return [];
        },
      },
      onRemoveClicked: {
        type: Function,
      },
      onAddClicked: {
        type: Function,
      },
      onEditClicked: {
        type: Function,
      },
    },
    data() {
      return {
        columns: [
          {
            prop: 'id',
            label: 'Id',
          },
          {
            prop: 'title',
            label: 'Title',
          },
          {
            prop: 'description',
            label: 'Description',
          },
          {
            prop: 'user',
            label: 'Author',
            formatter: formatAuthor,
          },
          {
            prop: 'created-at',
            label: 'Created',
            formatter: formatDate,
          },
        ],
        actionsDef: {
          colProps: {
            span: 1,
          },
          def: [
            {
              name: 'New',
              handler: this.onAddClicked,
            },
          ],
        },
        actionColDef: {
          label: 'Actions',
          def: [
            {
              handler: this.onEditClicked,
              buttonProps: {
                icon: 'el-icon-edit',
                type: 'success',
              },
            },
            {
              handler: this.onRemoveClicked,
              buttonProps: {
                icon: 'el-icon-delete',
                type: 'danger',
              },
            },
          ],
        },
      };
    },
  };
</script>

<style scoped>

</style>