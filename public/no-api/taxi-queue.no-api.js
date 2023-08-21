document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		let passengerQueue = 0;
		let taxiQueue = 0;

		return {
			version: 'no-api-1.0',

			joinQueue() {
				passengerQueue += 1;
				this.updatePassengerQueueCount();
			},

			leaveQueue() {
				if (passengerQueue > 0) {
					passengerQueue -= 1;
					this.updatePassengerQueueCount();
				}
			},

			joinTaxiQueue() {
				taxiQueue += 1;
				this.updateTaxiQueueCount();
			},

			queueLength() {
				return passengerQueue;
			},

			taxiQueueLength() {
				return taxiQueue;
			},

			taxiDepart() {
				if (passengerQueue >= 12) {
					passengerQueue -= 12;
					taxiQueue -= 1;
					this.updatePassengerQueueCount();
					this.updateTaxiQueueCount();
				}
			},

			updatePassengerQueueCount() {
				const passengerQueueCount = document.querySelector('.passenger_queue_count');
				if (passengerQueueCount) {
					passengerQueueCount.textContent = passengerQueue;
				}
			},

			updateTaxiQueueCount() {
				const taxiQueueCount = document.querySelector('.taxi_queue_count');
				if (taxiQueueCount) {
					taxiQueueCount.textContent = taxiQueue;
				}
			}
		}

	});

});



