<template>
	<form class="vue-auth-form">
		<div class="text-center mb-3">로고하나 추가하시고</div>

		<div class="form-group row">
			<label class="col-sm-4 col-form-label" for="username">사용자이름</label>
			<div class="col-sm-8">
				<input
					id="username"
					class="form-control"
					type="text"
					v-model="credential.username"
				/>
				<small id="passwordHelpInline" class="text-muted">참고 사항 적기</small>
			</div>
		</div>

		<div class="form-group row">
			<label class="col-sm-4 col-form-label" for="pwd">비밀번호</label>
			<div class="col-sm-8">
				<input
					id="pwd"
					class="form-control"
					type="password"
					v-model="credential.password"
				/>
				<small id="passwordHelpInline" class="text-muted">참고 사항 적기</small>
			</div>
		</div>

		<div class="form-group row">
			<label class="col-sm-4 col-form-label" for="pwd_confirm"
				>비밀번호 확인</label
			>
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
				<input
					id="email"
					class="form-control"
					type="email"
					v-model="credential.email"
				/>
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

		<!-- <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="age">선호 장르</label>
      <div class="col-sm-8">
        <input type="checkbox" value="1" v-model="credential.genre_prefer" />
        <label for="jack">드라마</label>
        <input type="checkbox" value="2" v-model="credential.genre_prefer" />
        <label for="john">로맨스</label>
        <input type="checkbox" value="3" v-model="credential.genre_prefer" />
        <label for="mike">공포</label>
      </div>
    </div> -->

		<button @click.prevent="signup" class="btn btn-primary">회원가입</button>
	</form>
</template>

<script>
import axios from 'axios';
export default {
	name: 'SignupForm',
	data() {
		return {
			credential: {
				username: '',
				password: '',
				passwordConfirm: '',
				email: '',
				age: 1,
				// 일단 기본값. 프로필 수정에서 변경 가능하도록.
				thumbnail:
					'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
			},
		};
	},
	methods: {
		signup() {
			if (this.validation()) {
				// 가입 프로세스
				const requestUrl = 'http://localhost:8000';
				axios
					.post(`${requestUrl}/auth/signup/`, this.credential)
					.then(res => {
						// 로그인 시키고 홈으로.
						const { token } = res.data;
						this.$store.dispatch('setTokenAction', token);
						this.$session.set('mmr-token', token);
						this.$router.push('/');
					})
					.catch(err => console.log(err.message));
			}
		},
		validation() {
			if (this.credential.password.length < 8) {
				console.log('password 길이 부족');
				return false;
			}
			if (this.credential.password !== this.credential.passwordConfirm) {
				console.log('password가 같지 않습니다.');
				return false;
			}
			// 올바른 이메일 ?
			if (!this.credential.email.includes('@')) {
				console.log('올바르지않은 이메일');
				return false;
			}
			if (
				parseInt(this.credential.age) < 1 ||
				parseInt(this.credential.age) > 200
			) {
				console.log('나이가 올바르지 않음');
				return false;
			}

			return true;
		},
	},
};
</script>

<style></style>
