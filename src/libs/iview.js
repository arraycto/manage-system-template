import Vue from 'vue'
import 'view-design/dist/styles/iview.css'
import { 
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  Option,
  DatePicker,
  Upload,
  Tooltip,
  RadioGroup,
  Radio,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Modal,
  Poptip,
  Table,
  Page,
  Tabs,
  TabPane,
  Button,
  Icon,
  Layout,
  Sider,
  Transfer,
  Collapse,
  CheckboxGroup,
  Panel,
  Checkbox,
  Header,
  Message,
  Drawer,
  Breadcrumb,
  BreadcrumbItem,
  Steps,
  Step,
  Badge,
  Scroll
} from 'view-design'
// import cascaderMulti from 'cascader-multi'

import cascaderMulti from '../components/CascaderMulti'

Vue.component('Header', Header)
Vue.component('Collapse', Collapse)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Panel', Panel)
Vue.component('Checkbox', Checkbox)
Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('InputNumber', InputNumber)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('DatePicker', DatePicker)
Vue.component('Upload', Upload)
Vue.component('Tooltip', Tooltip)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Avatar', Avatar)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Modal', Modal)
Vue.component('Poptip', Poptip)
Vue.component('Table', Table)
Vue.component('Page', Page)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Layout', Layout)
Vue.component('Sider', Sider)
Vue.component('Transfer', Transfer)
Vue.component('Drawer', Drawer)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Steps', Steps)
Vue.component('Step', Step)
Vue.component('Badge', Badge)
Vue.component('Scroll', Scroll)

Vue.prototype.$Message = Message
Vue.use(cascaderMulti)
