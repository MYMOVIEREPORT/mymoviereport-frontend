<template>
	<div
		class="modal fade"
		:id="`user-${user.id}`"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLongTitle"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">
						사용자 정보 수정
					</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<!-- 바디 -->
				<div class="modal-body">
					<form>
						<div class="form-group">
							<label for="exampleInputEmail1">이메일</label>
							<input
								type="email"
								class="form-control"
								id="email"
								aria-describedby="emailHelp"
								v-model="updatedUser.email"
							/>
							<small id="emailHelp" class="form-text text-muted"
								>We'll never share your email with anyone else.</small
							>
						</div>
						<div>
							<label>프로필사진</label>
							<Uploader
								@uploading="onUploading"
								@photoUploaded="onUploaded"
								@uploadError="onUploadErr"
							/>
						</div>
						<Loading v-if="uploading" />
						<div v-else class="d-flex justify-content-center my-3">
							<img
								:src="this.updatedUser.thumbnail"
								alt=""
								style="width:200px"
							/>
						</div>
					</form>
				</div>

				<!-- 푸터 -->
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary">
						취소
					</button>
					<button type="button" class="btn btn-warning" @click="onUpdate">
						변경사항 저장
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Uploader from '../Util/Uploader';
import Loading from '../Util/Loading';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
	name: 'UserUpdateModal',
	data() {
		return {
			updatedUser: {
				email: this.user.email,
				thumbnail: this.user.thumbnail,
			},
			uploading: false,
		};
	},
	props: {
		user: {
			type: Object,
		},
	},
	components: {
		Uploader,
		Loading,
	},
	computed: {
		...mapGetters(['requestHeader']),
	},
	methods: {
		onUploading() {
			this.uploading = true;
		},
		onUploaded(data) {
			this.uploading = false;
			const { Location } = data;
			this.updatedUser.thumbnail = Location;
		},
		onUploadErr() {
			this.uploading = false;
		},
		onUpdate() {
			const requestUrl = process.env.VUE_APP_REQUEST_URL;
			console.log(this);
			if (!this.uploading) {
				axios
					.put(
						`${requestUrl}/api/v1/user/${this.user.id}/`,
						this.updatedUser,
						this.requestHeader
					)
					.then(res => console.log(res))
					.catch(err => console.log(err));
			}
		},
	},
};
</script>

<style></style>
