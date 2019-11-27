<template>
	<div>
		<div class="input-group">
			<div class="custom-file">
				<input
					class="custom-file-input"
					id="file-selector"
					ref="file"
					type="file"
					@change="handleFileUpload"
					accept=".jpg,.jpeg,.png,.gif"
				/>
				<label class="custom-file-label" for="inputGroupFile04">{{
					this.file ? this.file.name : '이미지를 선택해주세요'
				}}</label>
			</div>
		</div>
	</div>
</template>

<script>
import AWS from 'aws-sdk';
export default {
	data() {
		return {
			file: null,
			albumBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
			bucketRegion: process.env.VUE_APP_AWS_REGION,
			IdentityPoolId: process.env.VUE_APP_AWS_POOLID,
		};
	},
	methods: {
		handleFileUpload() {
			this.file = this.$refs.file.files[0];
			this.upload();
		},
		upload() {
			this.$emit('uploading');
			AWS.config.update({
				region: this.bucketRegion,
				credentials: new AWS.CognitoIdentityCredentials({
					IdentityPoolId: this.IdentityPoolId,
				}),
			});
			let timestamp = new Date().getTime();
			let photoKey = timestamp + this.file.name;
			var upload = new AWS.S3.ManagedUpload({
				params: {
					Bucket: this.albumBucketName,
					Key: photoKey,
					Body: this.file,
					ACL: 'public-read',
				},
			});

			var promise = upload.promise();

			promise.then(
				data => {
					this.$emit('photoUploaded', data);
				},
				err => {
					this.$emit('uploadError', err);
					return;
				}
			);
		},
	},
};
</script>

<style></style>
