<template>
  <form class="vue-auth-form">
    <div class="text-center mb-3">로고하나 추가하시고</div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="username">사용자이름</label>
      <div class="col-sm-8">
        <input id="username" class="form-control" type="text" v-model="credential.username" />
        <small id="passwordHelpInline" class="text-muted">참고 사항 적기</small>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="pwd">비밀번호</label>
      <div class="col-sm-8">
        <input id="pwd" class="form-control" type="password" v-model="credential.password" />
        <small id="passwordHelpInline" class="text-muted">참고 사항 적기</small>
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
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="email">이메일</label>
      <div class="col-sm-8">
        <input id="email" class="form-control" type="email" v-model="credential.email" />
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
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="age">선호 장르</label>
      <div class="col-sm-8">
        <input type="checkbox" id="jack" value="1" v-model="credential.genre_prefer" />
        <label for="jack">드라마</label>
        <input type="checkbox" id="john" value="2" v-model="credential.genre_prefer" />
        <label for="john">로맨스</label>
        <input type="checkbox" id="mike" value="3" v-model="credential.genre_prefer" />
        <label for="mike">공포</label>
      </div>
    </div>

    <button @click.prevent="signup" class="btn btn-primary">회원가입</button>
  </form>
</template>

<script>
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
        genre_prefer: [],
        // 일단 기본값. 프로필 수정에서 변경 가능하도록.
        thumbnail:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      }
    };
  },
  methods: {
    signup() {
      if (this.validation()) {
        // 가입 프로세스
        console.log(this.credential);

        // 홈으로.
        this.$router.push("/");
      }
    },
    validation() {
      // 유저이름 존재여부
      // 비밀번호 길이
      // 비밀번호 === 비밀번호컨펌
      // 올바른 이메일 ?
      // 올바른 나이 (1 ~ 200)
      // 빈 장르 가능?
      // 비어있는 이미지 => 기본이미지 url 추가하기
      return true;
    }
  }
};
</script>

<style>
</style>