import Vue from 'vue';
import 'font-awesome/css/font-awesome.css';
import VeeValidate from 'vee-validate';
import Notifications from 'vue-notification';
import DataTables from 'vue-data-tables';
import {
  Table,
  TableColumn,
  Pagination,
  Col,
  Row,
  Button,
  Dialog,
  Loading,
  MessageBox,
  DatePicker,
  Form,
  FormItem,
  Input,
  Select,
  Option,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import App from './App';
import router from './router';

const veeValidateConfig = {
  fieldsBagName: 'veeFields',
};

Vue.use(VeeValidate, veeValidateConfig);
Vue.use(Table);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Col);
Vue.use(Row);
Vue.use(TableColumn);
Vue.use(DataTables);
Vue.use(Pagination);
Vue.use(Notifications);
locale.use(lang);
Vue.config.productionTip = false;
Vue.prototype.$confirm = MessageBox.confirm;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
