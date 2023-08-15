export const validator = {
  validateEmail: (rule, value) => {
    /* eslint-disable */
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    if (value && !emailRegex.test(value)) {
      return Promise.reject(new Error('Email không hợp lệ'));
    } else {
      return Promise.resolve();
    }
  },
  validatePassword: (rule, value) => {
    /* eslint-disable */
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+~`[\]{}|:;"'<>,.?/])[A-Za-z\d!@#$%^&*()\-=_+~`[\]{}|:;"'<>,.?/]{8,20}$/;
    if (value && !passwordRegex.test(value)) {
      return Promise.reject(
        new Error(
          'Mật khẩu yêu cầu có tối thiểu từ 8 đến 20 ký tự bao gồm 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt.'
        )
      );
    } else {
      return Promise.resolve();
    }
  }
};
