<template>
	<div
		class="modal fade"
		:id="`movie-${movie.id}`"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLongTitle"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">REPORTING</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form>
						<input
							id="title"
							type="text"
							v-model="post.title"
							placeholder="제목을 입력하세요"
						/>
						<hr />
						<textarea
							id="content"
							type="text"
							v-model="post.content"
							placeholder="내용을 입력하세요"
							style="height:300px;"
						/>
						<hr />
						<h5 class="text-center">평점</h5>
						<div class="d-flex justify-content-center my-3">
							<StarRating
								:star-size="25"
								v-model="post.score"
								:max-rating="10"
								:increment="0.5"
								:show-rating="false"
								active-color="#e74c3c"
							/>
						</div>
						<div class="form-check text-center my-3">
							<input
								class="form-check-input"
								type="checkbox"
								v-model="post.published"
								id="defaultCheck1"
							/>
							<label class="form-check-label" for="defaultCheck1">
								리포트 공개여부
							</label>
						</div>

						<Uploader
							@photoUploaded="onPhotoUploaded"
							@uploadError="onPhotoErreor"
							@uploading="onUploading"
						/>
					</form>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" @click="createPost">
						<Loading v-if="requesting" size="small" />
						<span>완료</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Loading from '../Util/Loading';
import { mapGetters } from 'vuex';
import StarRating from 'vue-star-rating';
import Uploader from '../Util/Uploader';
export default {
	name: 'PostFormModal',
	data() {
		return {
			post: {
				title: '',
				content: '',
				score: 5,
				published: false,
				image:
					'https://mmr-album.s3.ap-northeast-2.amazonaws.com/1574823561489ticket.jpg',
				movie_id: this.$store.getters.movie.id,
			},
			requesting: false,
			uploading: false,
		};
	},
	components: {
		Loading,
		StarRating,
		Uploader,
	},
	computed: {
		...mapGetters(['requestHeader', 'movie']),
	},
	methods: {
		createPost() {
			const reqUrl = process.env.VUE_APP_REQUEST_URL;
			if (!this.requesting && !this.uploading) {
				this.requesting = true;
				axios
					.post(`${reqUrl}/api/v1/post/create/`, this.post, this.requestHeader)
					.then(res => {
						const { data } = res;

						// 평가에 추가
						this.$store.dispatch('updateMoviePostsAction', data);
						// 모달 제거
						const body = document.querySelector('body');
						const modal = document.querySelector('.modal');
						const modalBack = document.querySelector('.modal-backdrop');
						modal.classList.toggle('show');
						modal.style.display = 'none';
						modalBack.remove();
						body.classList.toggle('modal-open');

						this.requesting = false;
						// 평가한 포스트라고 알려주기
						this.$emit('userPosted');
					})
					.catch(err => console.log(err.response));
			}
		},
		onPhotoUploaded(data) {
			this.uploading = false;
			alert('성공적으로 업로드 되었습니다!');
			const { Location } = data;
			this.post.image = Location;
		},
		onPhotoErreor(err) {
			this.uploading = false;
			alert('업로드에 실패했습니다.');
			console.log(err);
		},
		onUploading() {
			this.uploading = true;
		},
	},
};
</script>

<style scoped>
.modal-content {
	/* background-color: #bfad83; */
	border: none;
}

#title {
	border: none;
	width: 100%;
	padding: 0.5rem;
	background-color: transparent;
}

input,
textarea:focus {
	outline: none;
}

#content {
	width: 100%;
	border: none;
	padding: 0.5rem;
	background-color: transparent;
}
</style>
