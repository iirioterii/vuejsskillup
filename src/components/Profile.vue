<template>
  <div class="profile">
    <div class="title-2">
      <h1>{{ header }}</h1>
    </div>
    <div class="profile_container">
      <el-form v-loading="loading" class="profile_form">

        <el-form-item label="Username">
          <el-input
              name="name"
              v-model="formData.name"
              v-validate="'required|max:32'"
          ></el-input>
          <i v-show="errors.has('name')" class="fa fa-warning"></i>
          <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </el-form-item>

        <el-form-item label="Email">
          <el-input
              name="email"
              v-model="formData.email"
              v-validate="'required|email|max:255'"
          ></el-input>
          <i v-show="errors.has('email')" class="fa fa-warning"></i>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </el-form-item>

        <el-form-item label="First name">
          <el-input
              name="firstname"
              v-model="formData.firstname"
              v-validate="'min:2|max:255'"
          ></el-input>
          <i v-show="errors.has('firstname')" class="fa fa-warning"></i>
          <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
        </el-form-item>

        <el-form-item label="Middle name">
          <el-input
              name="middlename"
              v-model="formData.middlename"
              v-validate="'min:2|max:255'"
          ></el-input>
          <i v-show="errors.has('middlename')" class="fa fa-warning"></i>
          <span v-show="errors.has('middlename')" class="help is-danger">{{ errors.first('middlename') }}</span>
        </el-form-item>

        <el-form-item label="Last name">
          <el-input
              name="lastname"
              v-model="formData.lastname"
              v-validate="'min:2|max:255'"
          ></el-input>
          <i v-show="errors.has('lastname')" class="fa fa-warning"></i>
          <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
        </el-form-item>

        <el-form-item label="Birthday">
          <el-date-picker
              name="birthday"
              v-model="formData.birthday"
              type="date"
              format="MM/dd/yyyy"
              placeholder="Pick a day">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Gender">
          <el-select
              name="gender"
              v-model="formData.gender"
              :clearable="true"
              placeholder="Select"
          >
            <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" :disabled="isFormInvalid" @click="validateBeforeSubmit">Update</el-button>
        <el-button type="info" icon="el-icon-refresh" @click="syncWithFacebook" >Sync with Facebook</el-button>

      </el-form>
    </div>
  </div>
</template>

<script>
  import unset from 'lodash/unset';
  import { getMe, updateUser } from '../services/api';
  import { getEntityDataFromJsonApiResponse } from '../services/normalizers';
  import { getEncodedJWTToken } from '../services/auth';

  export default {
    name: 'profile',
    computed: {
      isFormInvalid() {
        return Object.keys(this.veeFields).some(key => this.veeFields[key].invalid);
      },
    },
    data() {
      return {
        genderOptions: [
          {
            value: 'male',
            label: 'Male',
          },
          {
            value: 'female',
            label: 'Female',
          },
        ],
        formData: {
          id: '',
          email: '',
          name: '',
          firstname: '',
          middlename: '',
          lastname: '',
          birthday: '',
          gender: '',
        },
        header: 'Profile',
        loading: false,
      };
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator
          .validateAll()
          .then((isValid) => {
            if (isValid) {
              this.loading = true;

              const formData = Object.assign({}, this.$data.formData);
              const requestData = {
                data: {
                  id: formData.id,
                  type: 'users',
                  attributes: formData,
                },
              };

              const oldUserEmail = getEncodedJWTToken().user.email;
              const newUserEmail = formData.email;

              if (oldUserEmail === newUserEmail) {
                unset(formData, 'email');
              }

              updateUser(formData.id, requestData)
                .then(() => this.$notify({
                  title: 'Update successfully',
                  text: 'You are successfully updated your profile',
                  type: 'success',
                }))
                // handle errors
                .catch(err => this.$notify({
                  title: 'Update error',
                  text: err.message,
                  type: 'error',
                }))
                .finally(() => this.loading = false);
            }
          });
      },
      getUserInfoFromFacebook() {
        this.loading = true;
        FB.api('/me', { fields: 'first_name, middle_name, last_name, birthday, gender' }, // eslint-disable-line no-undef
          (userProfile) => {
            this.formData = {
              id: this.formData.id,
              email: this.formData.email,
              name: this.formData.name,
              firstname: userProfile.first_name,
              middlename: userProfile.middle_name,
              lastname: userProfile.last_name,
              birthday: new Date(userProfile.birthday),
              gender: userProfile.gender,
            };

            this.loading = false;
          });
      },
      facebookLogin(successCallback) {
        FB.login((loginResponse) => { // eslint-disable-line no-undef
          if (loginResponse.authResponse) {
            successCallback();
          } else {
            this.$notify({
              title: 'Login to facebook failed',
              text: 'Use created facebook account and give needed permissions',
              type: 'error',
            });
          }
        },
        { scope: 'public_profile, user_birthday' },
        );
      },
      syncWithFacebook() {
        FB.getLoginStatus((response) => { // eslint-disable-line no-undef
          if (response.status === 'connected') {
            this.getUserInfoFromFacebook();
          } else {
            this.facebookLogin(this.getUserInfoFromFacebook);
          }
        });
      },
    },
    mounted() {
      this.loading = true;
      getMe()
        .then(response => this.formData = getEntityDataFromJsonApiResponse(response))
        .finally(() => this.loading = false);
    },
    created() {
      /* eslint-disable */
      window.fbAsyncInit = function() {
        FB.init({
          appId: '318626185315948',
          cookie: true,
          xfbml: true,
          version: 'v2.11',
        });
        FB.AppEvents.logPageView();
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    /* eslint-enable */
  };
</script>

<style scoped>
  .title-2 {
    text-align: center;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }

  .profile_form {
    width: 100%;
    max-width: 500px;
  }

  .profile_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
</style>