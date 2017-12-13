<template>
    <form v-on:submit.prevent="validateBeforeSubmit">
        <div class="col-sm-4 col-sm-offset-4">
            <h2>Log In</h2>
            <p>Log in to your account to get some great quotes.</p>
            <div class="alert alert-danger" v-if="error">
                <p>{{ error }}</p>
            </div>
            <div class="form-group">
                <input
                        name="email"
                        type="text"
                        class="form-control"
                        placeholder="Enter your email"
                        v-model.trim="credentials.email"
                        v-validate="'required|email|max:255'"
                        :class="{'input': true, 'is-danger': errors.has('email') }"
                >
                <i v-show="errors.has('email')" class="fa fa-warning"></i>
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
                <input
                        name="password"
                        type="password"
                        class="form-control"
                        placeholder="Enter your password"
                        v-model.trim="credentials.password"
                        v-validate="'required|min:8|max:16'"
                >
                <i v-show="errors.has('password')" class="fa fa-warning"></i>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </div>
            <button class="btn btn-primary" type="submit">Login</button>
        </div>
    </form>
</template>

<script>
  // import auth from '@/services/auth';

  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: '',
        },
        error: '',
      };
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator
          .validateAll()
          .then((isValid) => {
            if (isValid) {
              const credentials = {
                email: this.credentials.email,
                password: this.credentials.password,
              };
              console.log('submit', credentials);
              // auth.login_or_signup('login', this, credentials, '/');
            }
          });
      },
    },
  };
</script>

<style lang="scss" type="text/scss" scoped>
    $red: #ff1c21;
    .alert {
        padding: 10px;
        &.alert-danger {
            color: $red;
        }
    }
</style>