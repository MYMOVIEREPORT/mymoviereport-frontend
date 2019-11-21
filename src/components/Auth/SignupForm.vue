<template>
  <form class="vue-auth-form">
    <div class="text-center mb-3">로고하나 추가하시고</div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="username">사용자이름</label>
      <div class="col-sm-8">
        <input id="username" class="form-control" type="text" v-model="credential.username" />
        <small v-if="errorMessage.usernameError.length > 0">{{errorMessage.usernameError}}</small>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="pwd">비밀번호</label>
      <div class="col-sm-8">
        <input id="pwd" class="form-control" type="password" v-model="credential.password" />
        <small
          v-if="errorMessage.passwordLengthError.length > 0"
        >{{errorMessage.passwordLengthError}}</small>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="pwd_confirm">비밀번호 확인</label>
      <div class="col-sm-8">
        <input
          id="pwd_confirm"
          class="form-control"
          type="password"
          v-model="credential.passwordConfirm"
        />
        <small
          v-if="errorMessage.passwordUnmatchError.length > 0"
        >{{errorMessage.passwordUnmatchError}}</small>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="email">이메일</label>
      <div class="col-sm-8">
        <input id="email" class="form-control" type="email" v-model="credential.email" />
        <small v-if="errorMessage.emailError.length > 0">{{errorMessage.emailError}}</small>
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
        <small v-if="errorMessage.ageError.length > 0">{{errorMessage.ageError}}</small>
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
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      },
      errorMessage: {
        usernameError: "",
        passwordUnmatchError: "",
        passwordLengthError: "",
        emailError: "",
        ageError: ""
      }
    };
  },
  methods: {
    signup() {
      this.errorMessage.usernameError = "";
      if (this.validation()) {
        // 가입 프로세스
        const requestUrl = "http://localhost:8000";
        axios
          .post(`${requestUrl}/auth/signup/`, this.credential)
          .then(res => {
            // 로그인 시키고 홈으로.
            const { token } = res.data;
            this.$store.dispatch("setTokenAction", token);
            this.$session.set("mmr-token", token);
            this.$router.push("/");
          })
          .catch(() => {
            // 에러메세지 받아오기 가능?
            this.errorMessage.usernameError =
              "이미 존재하는 사용자 이름 또는 유효하지 않은 이름입니다.";
          });
      }
    },
    validation() {
      // 초기화 후 다시 메시징
      this.errorMessage = {
        usernameError: "",
        passwordUnmatchError: "",
        passwordLengthError: "",
        emailError: "",
        ageError: ""
      };

      if (this.credential.password.length < 8) {
        this.errorMessage.passwordLengthError =
          "비밀번호는 8자 이상이어야 합니다.";
        return false;
      }
      if (this.credential.password !== this.credential.passwordConfirm) {
        this.errorMessage.passwordUnmatchError =
          "비밀번호가 동일하지 않습니다.";
        return false;
      }
      if (!this.credential.email.includes("@")) {
        this.errorMessage.emailError = "올바르지않은 이메일 형식입니다.";
        return false;
      }
      if (
        parseInt(this.credential.age) < 1 ||
        parseInt(this.credential.age) > 200
      ) {
        this.errorMessage.ageError = "나이가 올바르지 않습니다.";
        return false;
      }

      return true;
    }
  }
};
</script>

<style scoped>
small {
  color: red;
}
</style>
