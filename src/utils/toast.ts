import { ElMessage } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/icon.scss';

interface ToastInterface {
  success?: (msg: string) => void;
  warning?: (msg: string) => void;
  error?: (msg: string) => void;
  info?: (msg: string) => void;
}

class Toast implements ToastInterface {
  instance: ToastInterface = {};
  constructor(instance: ToastInterface) {
    this.instance = instance;
  }
  success(msg: string) {
    this.instance.success?.(msg);
  }
  warning(msg: string) {
    this.instance.warning?.(msg);
  }
  error(msg: string) {
    this.instance.error?.(msg);
  }
  info(msg: string) {
    this.instance.info?.(msg);
  }
}

export default new Toast({
  success(msg) {
    ElMessage.success(msg);
  },
  warning(msg) {
    ElMessage.warning(msg);
  },
  error(msg) {
    ElMessage.error(msg);
  },
  info(msg) {
    ElMessage(msg);
  },
});
