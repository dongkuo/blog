import Vue from 'vue';
import Main from './main.vue';
let ToastConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Toast = function(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      toast: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'toast_' + seed++;

  options.onClose = function() {
    Toast.close(id, userOnClose);
  };
  instance = new ToastConstructor({
    data: options
  });
  instance.id = id;
  if (isVNode(instance.toast)) {
    instance.$slots.default = [instance.toast];
    instance.toast = null;
  }
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = "2000";
  instances.push(instance);
  return instance.vm;
};

['primary', 'success', 'warning', 'error'].forEach(type => {
  Toast[type] = options => {
    if (typeof options === 'string') {
      options = {
        toast: options
      };
    }
    options.type = type;
    return Toast(options);
  };
});

Toast.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

Toast.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

function isVNode(node) {
  return typeof node === 'object' && hasOwn(node, 'componentOptions');
}

export default Toast;
