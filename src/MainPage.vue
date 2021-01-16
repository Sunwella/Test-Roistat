<template>
	<div class="p-20">
		<button class="mb-12" @click="openForm">Добавить</button>
		<div v-if="isFormShown">
			<FormAdding @close="closeAddingForm" @add-worker="addWorker" :bosses="workers" />
		</div>
		<Table :workers="workers" />
	</div>
</template>

<script>
	import Table from './components/Table.vue'
	import FormAdding from './components/FormAdding.vue'
	import {getWorkers} from './components/data.js'
	import {saveWorker} from './components/data.js'

	export default {
		components: {
			Table,
			FormAdding
		},
		data() {
			return {
				workers: [],
				isFormShown: false
			}
		},
		created() {
			this.workers = getWorkers();
		},
		methods: {
			addWorker(newWorker) {
				saveWorker(newWorker);
				this.isFormShown = false;
				this.workers = getWorkers();
			},
			openForm() {
				this.isFormShown = !this.isFormShown;
			},
			closeAddingForm() {
				this.isFormShown = false;
			}
		},
		computed: {
			getNames() {
				return this.names;
			}
		}
	}
</script>

<style lang="scss">
	h1, h2, h3, h4, h4, h6, p, button, input, select, table {
		font-family: Gill Sans, sans-serif;
		font-weight: 300;
	}
	.text-center {
		text-align: center;
	}
	.mr-10 {
		margin-right: 10px;
	}
	.mb-12 {
		margin-bottom: 12px;
	}
	.p-20{
		padding: 20px;
	}
	
</style>