
const optionDefinitions = [
	{ name: 'name', alias: 'n', type: String, defaultValue: 'ch5-svelte'},
	{ name: 'path', alias: 'p', type: String, defaultValue: 'public'},
	{ name: 'output', alias: 'o', type: String, defaultValue: 'CH5-Build'},
	{ name: 'host', alias: 'h', type: String, defaultValue: undefined},
	{ name: 'sftp', alias: 's', type: String, defaultValue: 'display'},
	{ name: 'type', alias: 't', type: String, defaultValue: 'touchscreen'},
	{ name: 'dev', alias: 'd', type: Boolean, defaultValue: false}
]
const commandLineArgs = require('command-line-args');
const cliOptions = commandLineArgs(optionDefinitions);
console.log(cliOptions)

if(cliOptions.dev){
	process.env.ROLLUP_WATCH = true;
};

const loadConfigFile = require('rollup/dist/loadConfigFile');
const path = require('path');
const rollup = require('rollup');
const ch5 = require('@crestron/ch5-utilities');

console.log('Starting Rollup...')
loadConfigFile(path.resolve(__dirname, 'rollup.config.js'))
  .then(async ({options, warnings}) => {
	console.log('Rollup.config.js loaded...');
	warnings.flush();

	const bundle = await rollup.rollup(options[0]);
	await Promise.all(options[0].output.map(bundle.write));
	const watcher = rollup.watch(options[0]);
	
	watcher.on('event', event => {
		if(event.code == 'START'){
			console.log('Bundling project...\n');
		}
		if(event.code == 'END'){
			setTimeout(()=>ch5OneStep(), 10000)
		}
		if(event.code == 'ERROR'){
			console.log(event)
		}
	});
  })

  function ch5OneStep(){
	ch5.archiver(
		{ 
			projectName: cliOptions.name,
			directoryName: cliOptions.path,
			outputDirectory: cliOptions.output
		}
	).then(()=>{
		if(cliOptions.host === undefined){
			console.log('\n')
			if(process.env.ROLLUP_WATCH === undefined){
				process.exit(0);
			}
		} 
		else {
			ch5.distributor(cliOptions.output + '/' + cliOptions.name + '.ch5z',
			{
				controlSystemHost: cliOptions.host,
				sftpDirectory: cliOptions.sftp,
				deviceType: cliOptions.type
			}
		).then(()=>{
			console.log('\n')
			if(process.env.ROLLUP_WATCH === undefined){
				process.exit(0);
			}
		})
		}
	}
	)
  }