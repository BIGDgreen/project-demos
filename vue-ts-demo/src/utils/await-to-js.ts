/**
 * async-await 错误处理
 * @param promise
 * @param errorMsg 默认为 true，当不需要错误提示时置为 false。当需要自定义错误信息时，errorMsg 传入错误提示信息字符串。errorMsg 不为 false 时执行用户自定义的错误处理函数，传入参数为：用户自定义的错误信息或请求结果
 * @returns [err, res]
 */
export default function to<T, U = T>(promise: Promise<any>, errorMsg: boolean | string = true): Promise<[null, T] | [U, undefined]> {
  return promise
          .then<[null, T]>(data => [null, data] )
          .catch<[U, undefined]>(err => {
            if(errorMsg && errorFn) {
              const msg: string = typeof errorMsg === 'string' ? errorMsg : err
              errorFn(msg)
            }
            return [err, undefined]
          })
  };

let errorFn: Function

to.prototype.register = function(_errorFn: Function) {
  errorFn = _errorFn
}