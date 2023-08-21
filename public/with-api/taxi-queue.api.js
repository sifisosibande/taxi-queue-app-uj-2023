document.addEventListener('alpine:init', () => {
    Alpine.data('TaxiQueue', () => {
        return {
            version: 'api-1.0',
            queueLength: 0,
            taxiQueueLength: 0,

            init() {
                this.updateQueueLength();
                this.updateTaxiQueueLength();
            },

            updateQueueLength() {
                axios.get('/api/passenger/queue')
                    .then(response => {
                        this.queueLength = response.data.queueCount;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            updateTaxiQueueLength() {
                axios.get('/api/taxi/queue')
                    .then(response => {
                        this.taxiQueueLength = response.data.queueCount;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            joinQueue() {
                axios.post('/api/passenger/join')
                    .then(() => {
                        this.updateQueueLength();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            leaveQueue() {
                axios.post('/api/passenger/leave')
                    .then(() => {
                        this.updateQueueLength();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            joinTaxiQueue() {
                axios.post('/api/taxi/join')
                    .then(() => {
                        this.updateTaxiQueueLength();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            taxiDepart() {
                axios.post('/api/taxi/depart')
                    .then(() => {
                        this.updateQueueLength();
                        this.updateTaxiQueueLength();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        };
    });
});



