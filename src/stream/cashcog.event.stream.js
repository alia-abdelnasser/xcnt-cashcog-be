var CashcogEventStreamApi = require('./cashcog.event.stream.api.js');

var cashcogEventStream = new CashcogEventStreamApi({
    queriesPerSecond: 10
});

cashcogEventStream.on('data', data => console.log(data));
cashcogEventStream.on('end', () => console.log('Done.'));

cashcogEventStream.write();
cashcogEventStream.end();