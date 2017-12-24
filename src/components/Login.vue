<template>
    <form v-loading="loading" v-on:submit.prevent="validateBeforeSubmit">
      <div class="panel">
        <h2 class="title-1">Log In</h2>
        <p class="sub-title-1">Log in to your account</p>
        <div class="alert alert-danger" v-if="error">
          <i class="fa fa-frown-o alert-icon"></i>
          <p>{{ error }}</p>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
              id="email"
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
          <label for="password">Password</label>
          <input
              id="password"
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
        <button :disabled="isFormInvalid" class="btn btn-primary" type="submit">Login</button>
      </div>
    </form>
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
        error: '',
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
  $red: #ff1c21;

  .alert {
    display: flex;
    padding: 10px;
    border: 1px solid;
    border-radius: 3px;
    &.alert-danger {
      color: $red;
      border-color: $red;
    }
  }

  .alert-icon {
    font-size: 30px;
    margin-right: 10px;
  }

</style>
