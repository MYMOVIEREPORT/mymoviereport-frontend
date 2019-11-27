<template>
	<article class="post-contents">
		<!-- Modal -->
		<div
			class="modal fade"
			:id="`post-${post.id}`"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalLongTitle"
			aria-hidden="true"
		>
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header p-0">
						<img :src="post.image" />
					</div>
					<div class="modal-body">
						<!-- 타이틀 + 공개여부 -->
						<div class="d-flex justify-content-between align-items-center px-3">
							<h5 class="m-0">{{ post.title }}</h5>
							<input type="text" name="" id="" v-show="modify" />
							<h6 class="m-0">
								<span v-if="post.published" class="badge badge-success"
									>공개중</span
								>
								<span v-else class="badge badge-secondary">비공개</span>
							</h6>
						</div>
						<hr />
						<!-- 별점 -->

						<!-- 포스트 내용 -->
						<p class="p-3">{{ post.content }}</p>
						<!-- 포스트의 영화 인증 -->
						<div class="certified-container">
							<div class="post-certified">
								<img
									v-if="post.movie.poster_url"
									:src="post.movie.poster_url"
									style="width:70px;border-radius:5px;"
									class="p-0"
								/>
								<div
									class="d-flex flex-column align-items-center justify-content-center ml-3"
								>
									<div
										class="d-flex flex-column align-items-center justify-content-center"
										v-if="
											!isAuthenticated || loggedInUser.user_id !== post.user
										"
									>
										<div style="font-size:0.5rem" class="text-muted">
											NEED REPORT
										</div>
										<NotCertifiedMark />
									</div>
									<div
										class="d-flex flex-column align-items-center justify-content-center"
										v-if="isAuthenticated && loggedInUser.user_id === post.user"
									>
										<div style="font-size:0.5rem;color:#fbc531;">REPORTED</div>
										<CertifiedMark fill="#fbc531" />
									</div>
									<h5 class="text-break text-center m-0 mt-1">
										{{ post.movie.title_ko }}
									</h5>
								</div>
							</div>
						</div>
						<div class="d-flex justify-content-center my-2">
							<StarRating
								:star-size="25"
								:read-only="true"
								:rating="post.score"
								:max-rating="10"
								:increment="0.5"
								:show-rating="false"
								active-color="#e74c3c"
							/>
						</div>
					</div>
					<!-- 로그인 시 수정/삭제 버튼 -->

					<!-- 모달 푸터 -->
					<div class="modal-footer">
						<div v-if="isAuthenticated">
							<div v-if="loggedInUser.user_id === post.user" class="d-flex m-3">
								<button class="btn btn-sm btn-danger m-1" @click="deletePost">
									<TrashIcon />
								</button>
								<button class="btn btn-sm btn-warning m-1">
									<UpdateIcon />
								</button>
							</div>
						</div>
						<button
							type="button"
							class="btn btn-secondary"
							data-dismiss="modal"
						>
							닫기
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal End -->
	</article>
</template>

<script>
import axios from 'axios';
import StarRating from 'vue-star-rating';
import { mapGetters } from 'vuex';
import CertifiedMark from '../Icon/CertifiedMark';
import NotCertifiedMark from '../Icon/NotCertifiedMark';
import TrashIcon from '../Icon/TrashIcon';
import UpdateIcon from '../Icon/UpdateIcon';
export default {
	name: 'PostDetail',
	data() {
		return {
			modify: false,
		};
	},
	props: {
		post: {
			type: Object,
		},
	},
	components: {
		StarRating,
		CertifiedMark,
		NotCertifiedMark,
		TrashIcon,
		UpdateIcon,
	},
	computed: {
		...mapGetters(['requestHeader', 'isAuthenticated', 'loggedInUser']),
	},
	methods: {
		removeModal() {
			const body = document.querySelector('body');
			const modal = document.querySelector('.modal');
			const modalBack = document.querySelector('.modal-backdrop');
			modal.classList.toggle('show');
			modal.style.display = 'none';
			modalBack.remove();
			body.classList.toggle('modal-open');
		},
		deletePost() {
			const reqUrl = 'http://localhost:8000';
			axios
				.delete(`${reqUrl}/api/v1/post/${this.post.id}/`, this.requestHeader)
				.then(() => {
					this.removeModal();
					this.$store.dispatch('deleteMoviePostAction', this.post.id);
					this.$store.dispatch('deleteUserPostAction', this.post.id);
				})
				.catch(err => console.log(err.response));
		},
		onModify() {
			this.removeModal();

			this.$router.push(`/post/${this.post.id}/update/`);
		},
	},
};
</script>

<style scoped>
img {
	width: 100%;
	object-fit: cover;
	max-height: 400px;
}

.post-contents {
	color: black;
}

.certified-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.post-certified {
	display: flex;
}
</style>
