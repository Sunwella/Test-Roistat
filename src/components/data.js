export function getWorkers() {
	let items = localStorage.getItem('workers');
	return (items == null) ? [] : JSON.parse(items);
};

export function saveWorker(newWorker) {
	let workers = getWorkers();
	workers.push(newWorker);
	localStorage.setItem('workers', JSON.stringify(workers));
}