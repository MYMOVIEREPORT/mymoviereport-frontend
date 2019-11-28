<template>
  <form class="vue-auth-form">
    <h1 class="text-center mb-3">MMR</h1>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="username">사용자이름</label>
      <div class="col-sm-8">
        <input id="username" class="form-control" type="text" @keyup="onUsername" />
        <small v-if="error.username">{{ error.username }}</small>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="pwd">비밀번호</label>
      <div class="col-sm-8">
        <input id="pwd" class="form-control" type="password" @keyup="onPassword" />
        <small v-if="error.password">{{ error.password }}</small>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="pwd_confirm">비밀번호 확인</label>
      <div class="col-sm-8">
        <input id="pwd_confirm" class="form-control" type="password" @keyup="onPasswordConfirm" />
        <small v-if="error.passwordConfirm">{{ error.passwordConfirm }}</small>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="email">이메일</label>
      <div class="col-sm-8">
        <input id="email" class="form-control" type="email" v-model="credential.email" />
        <small v-if="error.email">{{ error.email }}</small>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="age">연령</label>
      <div class="col-sm-8">
        <input
          id="age"
          class="form-control"
          type="number"
          v-model="credential.age"
          min="1"
          max="200"
        />
        <small v-if="error.age">{{ error.age }}</small>
      </div>
    </div>

    <button @click.prevent="signup" class="btn btn-primary">회원가입</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "SignupForm",
  data() {
    return {
      credential: {
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
        age: "",
        // 일단 기본값. 프로필 수정에서 변경 가능하도록.
        thumbnail:
          "https://mmr-album.s3.ap-northeast-2.amazonaws.com/1574919030204NoPhoto.png"
      },
      error: {
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
        age: ""
      }
    };
  },
  methods: {
    validation() {
      if (this.credential.password !== this.credential.passwordConfirm) {
        this.error.passwordConfirm = "비밀번호가 동일하지 않습니다.";
        return false;
      }
      return true;
    },
    signup() {
      this.error = {
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
        age: ""
      };
      if (this.validation()) {
        const requestUrl = process.env.VUE_APP_REQUEST_URL;
        axios
          .post(`${requestUrl}/auth/signup/`, this.credential)
          .then(res => {
            // 로그인 시키고 홈으로.
            const { token } = res.data;
            this.$store.dispatch("setTokenAction", token);
            this.$session.set("mmr-token", token);
            this.$router.push("/");
          })
          .catch(err => {
            const { data } = err.response;
            for (let key in data) {
              if (data.hasOwnProperty(key)) {
                this.error[key] = data[key][0];
              }
            }
          });
      }
    },
    onUsername(e) {
      this.credential.username = e.target.value;
    },
    onPassword(e) {
      this.credential.password = e.target.value;
    },
    onPasswordConfirm(e) {
      this.credential.passwordConfirm = e.target.value;
    }
  }
};
</script>

<style scoped>
small {
  color: red;
}
</style>
