import Toast from './Toast';
import { ElMessage } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/icon.scss';

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
