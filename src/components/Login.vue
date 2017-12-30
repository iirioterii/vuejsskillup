<template>
  <div class="login-container">
    <form class="panel" v-loading="loading" v-on:submit.prevent="validateBeforeSubmit">
        <div class="panel-header">
          <h1 class="title-1">Log In</h1>
          <h2 class="sub-title-1">Log in to your account</h2>
        </div>

        <div class="panel-body">
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <div :class="{'input-group': true, 'has-error': errors.has('email') }">
              <input
                  id="email"
                  name="email"
                  type="text"
                  class="form-control"
                  placeholder="Enter your email"
                  v-model.trim="credentials.email"
                  v-validate="'required|email|max:255'"
              />
              <i v-show="errors.has('email')" class="fa fa-warning form-err-icon"></i>
            </div>
            <span v-show="errors.has('email')" class="form-err-msg">{{ errors.first('email') }}</span>
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div :class="{'input-group': true, 'has-error': errors.has('password') }">
            <input
                  id="password"
                  name="password"
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                  v-model.trim="credentials.password"
                  v-validate="'required|min:8|max:16'"
              />
              <i v-show="errors.has('password')" class="fa fa-warning form-err-icon"></i>
            </div>
            <span v-show="errors.has('password')" class="form-err-msg">{{ errors.first('password') }}</span>
          </div>
        </div>

        <div class="panel-footer">
          <button :disabled="isFormInvalid" class="btn btn-wide" type="submit">Login</button>
        </div>

    </form>
  </div>
</template>

<script>
  import { login } from '@/services/api';
  import { setJWTToken } from '@/services/auth';

  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: '',
        },
        loading: false,
      };
    },
    computed: {
      isFormInvalid() {
        return Object.keys(this.veeFields).some(key => this.veeFields[key].invalid);
      },
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator
          .validateAll()
          .then((isValid) => {
            if (isValid) {
              this.loading = true;
              const credentials = {
                email: this.credentials.email,
                password: this.credentials.password,
              };
              login(credentials)
                .then((response) => {
                  setJWTToken(response.data.attributes.token);
                  this.$router.push('/');
                })
                .catch((err) => {
                  this.loading = false;
                  if (err.response.status === 401) {
                    this.$notify({
                      title: 'Login failed',
                      text: 'Sorry! Check your email or password',
                      type: 'error',
                    });
                  }
                  // Handle errors
                })
              ;
            }
          });
      },
    },
  };
</script>

<style lang="scss" type="text/scss" scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
</style>
