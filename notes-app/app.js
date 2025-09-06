#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// yargs(process.argv).parse()
// console.log(process.argv)
const args = yargs(process.argv.slice(2))
  // .version('4.1.0')
  .command({
    command: 'add',
    describe: 'Add a new note',
    handler: function() {
      console.log('Adding a new note!!')
    }
  })
  .command(
    'remove <id>',
    'Remove a note',
    (yargs)=>{
      yargs.positional('id', {
        describe: 'Note id to delete',
        type: 'number'
      })
    },
    (argv)=>{
      console.log(`Removing note ${argv.id}`)
    }
  )
  .command(
    'list',
    'List all notes',
    (yargs)=>{},
    (argv)=>{
      console.log(`Listing notes... ${argv._}`)
    }
  )
  .command(
    'read <id>',
    'Read a note',
    (yargs)=>{
      yargs.positional('id', {
        describe: 'Note to read',
        type: 'number'
      })
    },
    (argv)=>{
      console.log(`Reading note ${argv.id}...`)
    }
  )
  .command(
    'greet <name>', 
    'Greets the given name', 
    (yargs) => {
      yargs.positional('name', {
        describe: 'The name to greet',
        type: 'string',
      });
    }, 
    (argv) => {
      console.log(`Hello, ${argv.name}!`);
    }
  )
  .parse()

console.log(args)

