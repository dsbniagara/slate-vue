import Notifications from './Notifications.vue'

const Notify = {
  install(Vue, args = {}) {
    if (this.installed) {
      return
    }
    this.instance = false;
    this.installed = true;
    this.params = args;

    Vue.component(args.componentName || 'notifications', Notifications)

    const notify = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params }
      }
      if (typeof params === 'object') {
        return this.instance.add(params);
      }
    }

    Vue['notify'] = notify
    Vue.prototype['$notify'] = notify
    Vue.prototype['$notifySetInstance'] = n => {
      this.instance = n
    }
  }
}

export default Notify