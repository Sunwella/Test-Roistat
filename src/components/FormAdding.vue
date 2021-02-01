<template>
	<div>
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<div class="inline">
							<h3>Добавление пользователя</h3>
							<button @click="close">x</button>
						</div>
					</div>
					<hr>
					<div class="modal-body">
						<div class="inline">
							<h4 class="mr-10">Имя</h4>
							<input
								v-model="internalDataObj.firstName">
						</div>
						<div class="inline">
							<h4 class="mr-10">Телефон</h4>
							<input
								v-model="internalDataObj.phone">
						</div>
						<div v-if="bosses != null">
							<div class="inline">
								<h4 class="mr-10">Начальник</h4>
								<select v-model="bossName">
									<option></option>
									<option v-for="(boss, index) in bosses" :key="index">
										<h4>{{ boss.firstName }}</h4>
									</option>
								</select>
							</div>
						</div>
					</div>
					<hr>
					<div class="modal-footer">
						<button :disabled="disabledButton" @click="addWorker">Добавить</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		props:["bosses", "dataObj"],
		data() {
			return {
				internalDataObj: null,
				bossName: '',
			}
		},
		watch: {
			dataObj: {
				immediate: true,
				handler(val) {
					this.internalDataObj = JSON.parse(JSON.stringify(val));
				}
			}
		},
		methods: {
			close() {
				this.$emit("close");
			},
			addWorker() {
				if(this.bosses != null) {
					let result = this.bosses.find(item => item.firstName == this.bossName);
					if (result) {
						this.internalDataObj.bossId = result.id;
					}
					this.internalDataObj.id = this.bosses.length + 1;
				} else {
					this.internalDataObj.bossId = 1;
				}

				if (this.bossName == '') {
					this.internalDataObj.bossId = null;
				}
				this.$emit("add-worker", this.internalDataObj);
			}
		},
		computed: {
			disabledButton() {
				return (this.internalDataObj.firstName == '' || this.internalDataObj.phone == '');
			}
		}
	}
</script>

<style lang="scss">
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		display: table;
		transition: opacity 0.3s ease;
	}

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	.modal-container {
		width: 300px;
		margin: 0px auto;
		padding: 20px 30px;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
	}
	.modal-header {
		margin-top: 0;
	}
	.modal-body {
		margin: 20px 0;
	}
	.inline {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	button:focus {
		outline: none;
	}
	input:focus {
		outline: none;
	}
	select:focus {
		outline: none;
	}
	input, select {
		width: -webkit-fill-available;
	}
</style>