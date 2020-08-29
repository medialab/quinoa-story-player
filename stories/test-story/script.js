
const fs = require('fs');
const request = require('request');

const download = function(uri, filename, callback){
	console.log('uri : ', uri);
	console.log('dest : ', filename)
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
    .on('error', console.log)
  });
};

const story = require('./story.json')

const images =  Object.entries(story.resources).map(r => r[1]).filter(r => r.metadata.type === 'image')
const prefix = 'https://fonio.medialab.sciences-po.fr/medialab/quinoa/static'
const urls = images.map(i => prefix + i.data.filePath)

urls.reduce((cur, url) => cur.then(
	() => new Promise((resolve, reject) => {
		const id = url.split('/').pop().split('.')[0]
		fs.mkdirSync('images/' + id);
		download(url, 'images/' + id + '/' + url.split('/').pop(), (err) => {
			if (err) {
				reject(err)
			} else resolve()
		})
	})
), Promise.resolve())