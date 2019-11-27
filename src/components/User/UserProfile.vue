<template>
	<div>
		<Loading v-if="loading" />
		<div v-else>
			<div class="mb-2">
				<img :src="user.thumbnail" class="rounded mx-auto d-block thumbnail" />
			</div>
			<h3 class="text-center">{{ user.username }}</h3>
			<h5 class="text-center text-muted font-italic">{{ user.email }}</h5>
			<div class="d-flex justify-content-center my-3">
				<button
					type="button"
					class="btn btn-primary w-auto"
					data-toggle="modal"
					:data-target="`#user-${user.id}`"
				>
					프로필 수정
				</button>
			</div>
			<UserUpdateModal :user="user" @userUpdated="onUserUpdated" />
		</div>
	</div>
</template>

<script>
import Loading from '../Util/Loading';
import UserUpdateModal from './UserUpdateModal';
export default {
	name: 'UserProfile',
	components: {
		Loading,
		UserUpdateModal,
	},
	computed: {
		loading() {
			return this.user ? false : true;
		},
	},
	props: {
		user: {
			type: Object,
		},
	},
	methods: {
		onUserUpdated(data) {
			const { email, thumbnail } = data;
			this.user.email = email;
			this.user.thumbnail = thumbnail;
		},
	},
};
</script>

<style>
.thumbnail {
	width: 200px;
}
</style>
