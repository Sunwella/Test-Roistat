<template>
	<div v-if="workers == null">
		<table class="table">
			<thead>
				<tr>
					<th v-for="(colName, index) in colNames" :key="index">{{ colName }}</th>
				</tr>
			</thead>
		</table>
		<h1 class="text-cetnter">Данных нет</h1>
	</div>

	<div v-else>
		<table class="table">
			<thead>
				<tr>
					<th 
						v-for="(colName, index) in colNames" 
						:key="index" 
						:class="{
							asc: isSortAsc && sortedColName == colName,
							desc: !isSortAsc && sortedColName == colName
						}"
						@click="sort(colName)" 
					>
						{{ colName }}
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="worker in bosses">
					<tr :key="worker.id">
						<td v-for="(colName, index) in colNames" :key="index">
							<button class="add" v-if="worker.bossId == null && colName == 'firstName'" @click="showSubordinatePeople(worker)">+</button>
							{{ worker[colName] }}
						</td>
					</tr>
					<template v-if="isSubardinatePeopleShown && currentBossId == worker.id">
						<tr v-for="worker in subordinateWorkersCurrentBoss" :key="worker.id">
							<td v-for="(colName, index) in colNames" :key="index">
								{{ worker[colName] }}
							</td>
						</tr>
					</template>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		props:["workers"],
		data() {
			return {
				colNames: ['id', 'firstName', 'phone', 'bossId'],
				currentBossId: null,
				isSortAsc: false,
				sortedColName: null,
				isSubardinatePeopleShown: false
			}
		},
		methods: {
			sort(colName) {
				if (this.sortedColName == colName) {
					this.isSortAsc = !this.isSortAsc;
				} else {
					this.isSortAsc = true;
				}
				this.sortedColName = colName;
			},
			showSubordinatePeople(worker) {
				if (this.currentBossId == worker.id) {
					this.isSubardinatePeopleShown = !this.isSubardinatePeopleShown;
				} else {
					this.isSubardinatePeopleShown = true;
				}
				this.currentBossId = worker.id;
			},
		},
		computed: {
			sortedTable() {
				let workers = [...this.workers];
				return workers.sort((a, b) => {
					if (this.isSortAsc == true) {
						if ( a[this.sortedColName] > b[this.sortedColName]) {
							return 1;
						} else {
							return -1;
						}
					} else {
						if ( a[this.sortedColName] < b[this.sortedColName]) {
							return 1;
						} else {
							return -1;
						}
					}
				});
			},
			bosses() {
				return this.sortedTable.filter(item => item.bossId == null);
			},
			subordinateWorkersCurrentBoss() {
				return this.sortedTable.filter(item => item.bossId == this.currentBossId);
			}
		}
	}
</script>

<style lang="scss">
	.table {
		width: 100%;
	}
	.table th, .table td {
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	}
	.asc::before {
		content: "▲";
	}

	.desc::before {
		content: "▼"
	}
	.add {
		margin-right: 7px;
	}
	table {
		border-collapse: collapse;
	}
	th {
		font-weight: normal;
		padding: 12px;
	}
	td {
		padding: 12px;
		text-align: center;
	}
</style>