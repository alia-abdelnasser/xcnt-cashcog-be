var CashcogEventStreamApi = require('./cashcog.event.stream.api.js');

// create an API stream which runs with a maximum of
// 10 queries per second, and caches results in wiki.db
var cashcogEventStream = new CashcogEventStreamApi({
    queriesPerSecond: 10,
    cacheFile: 'cashcog.db'
});

cashcogEventStream.on('data', d => console.log(d));
cashcogEventStream.on('end', () => console.log('Done.'));

cashcogEventStream.write();

cashcogEventStream.end();