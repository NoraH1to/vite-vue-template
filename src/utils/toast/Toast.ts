interface ToastInterface {
  success?: (msg: string) => void;
  warning?: (msg: string) => void;
  error?: (msg: string) => void;
  info?: (msg: string) => void;
}

export default class Toast implements ToastInterface {
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
