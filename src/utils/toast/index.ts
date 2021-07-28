import { ElMessage } from 'element-plus';
import { curry } from 'ramda';
import 'element-plus/packages/theme-chalk/src/icon.scss';
import { IMessageOptions } from 'element-plus/lib/el-message/src/types';

interface ToastInterface {
  success: (message?: string) => void;
  warning: (message?: string) => void;
  error: (message?: string) => void;
  info: (message?: string) => void;
}

const toastMsg = curry(
  (type: IMessageOptions['type'], message: string | undefined) => {
    message &&
      ElMessage({
        message,
        type,
      });
  },
);

const toastMsgSuccess = toastMsg('success');
const toastMsgWarning = toastMsg('warning');
const toastMsgError = toastMsg('error');
const toastMsgInfo = toastMsg('info');

const toast: ToastInterface = {
  success: toastMsgSuccess,
  warning: toastMsgWarning,
  error: toastMsgError,
  info: toastMsgInfo,
};

export default toast;
