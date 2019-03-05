import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'iview/dist/styles/iview.css';
import { 
	Button, 
	Tabs, 
	TabPane, 
	Icon, 
	Form, 
	FormItem, 
	Input, 
	Notice, 
	Layout, 
	Header, 
	Sider, 
	Content, 
	Footer,
	Menu, 
	Submenu, 
	MenuItem,
    Poptip,
    Modal,
    Card,
    RadioGroup,
    Radio,
    Checkbox,
    Select,
    Option,
    Message,
    Table,
    Upload,
    Page,
    LoadingBar,
    Tooltip,
    DatePicker
} from 'iview';
// console.log(Notice)
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Message = Message
Vue.config.productionTip = false;
Vue.component('i-button', Button);
Vue.component('i-tabs', Tabs);
Vue.component('i-tab-pane', TabPane);
Vue.component('i-icon', Icon);
Vue.component('i-poptip', Poptip);
Vue.component('i-modal', Modal);
Vue.component('i-card', Card);
Vue.component('i-page', Page);
Vue.component('i-tooltip', Tooltip);


/*表单*/
Vue.component('i-datePicker', DatePicker);
Vue.component('i-upload', Upload);
Vue.component('i-radioGroup', RadioGroup);
Vue.component('i-radio', Radio);
Vue.component('i-checkbox', Checkbox);
Vue.component('i-select', Select);
Vue.component('i-option', Option);
Vue.component('i-table', Table);
Vue.component('i-form', Form);
Vue.component('i-form-item', FormItem);
Vue.component('i-input', Input);

/*布局*/
Vue.component('i-layout', Layout);
Vue.component('i-header', Header);
Vue.component('i-sider', Sider);
Vue.component('i-content', Content);
Vue.component('i-footer', Footer);

/*左侧导航*/
Vue.component('i-menu', Menu);
Vue.component('i-submenu', Submenu);
Vue.component('i-menu-item', MenuItem);

Vue.prototype.$Notice = Notice;
router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {//如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/error');//如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
        if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
            if (localStorage.getItem("address")) { // 判断当前的address是否存在
                next();
                // next({
                //     path: '/console/wallet/new'
                // })
            }
            else {
                Vue.prototype.$Message.error('You need to create your wallet first!');
                next({
                    path: '/console/wallet/new'
                })
            }
        }
        else {
            next();
        }
    }
});
new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
