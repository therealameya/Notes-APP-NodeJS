// const fs = require('fs')
// console.log('works')
// fs.appendFileSync('notes.txt','\n So appendiing works eh!!')

const fs= require('fs')
const yargs= require('yargs')
const chalk= require('chalk')
const notes= require('./notes.js')
const { argv } = require('process')
const { demandOption, string } = require('yargs')



const command = process.argv[2]

yargs.command({
    command:'add',
    describe :'Add a note!!',
    builder:{
        title:{
            describe:'Note Title',
            demandOption: true,
            type: 'string',
        },
        body:{
            describe:"Body of the note.",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command:'remove',
    describe :'Remove a note!!',
    builder:{
        title:{
            describe:"Title of the note which is to be removed",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command:'list',
    describe :'List all notes!!',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command:'read',
    describe :'Read a note!!',
    builder:{
        title:{
            describe:'Title of the note you want to read.',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})




yargs.parse()
//console.log(yargs.argv)