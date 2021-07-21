<template>
  <div class="about">
    <button @click="handleClick">click here</button>
  </div>
</template>

<script>
// import to from 'await-to-js';

export default {
  data() {
    return {

    }
  },

  methods: {
    async handleClick() {
      console.log('clicked')
      const res = await this.asyncFn()
      console.log(res)
    },

    asyncFn() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('假装发一个请求...')
          // resolve('return a result')
          reject('return an error')
        })
      }).then(res => {
        return this.to(Promise.resolve(res))
      }).catch(err => {
        return this.to(Promise.reject(err), {e: '出错了'})
      })
    },

    to(promise, errorExt) {
      return promise
        .then(data => [null, data] )
        .catch(err => {
          if (errorExt) {
            err = Object.assign(err, errorExt);
          }
          console.log('err', err)
          return [err, undefined];
      });
    }
  }
}
</script>