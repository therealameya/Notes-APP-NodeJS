const fs = require('fs')
const chalk = require('chalk')
const getNotes = ()=> 'Your notes...'  

const addNote =function(title,body){
    const notes = loadNotes()
    
    const duplicateNote = notes.find((note)=> note.title===title)

    if (!duplicateNote){    
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse(('New note added !!')))
    }else{
        console.log(chalk.red.inverse('Note title already taken !!'))
    }
}

const saveNotes = (notes)=>{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const removeNote = (title)=>{
    const notes = loadNotes()
    const updatedNotes = notes.filter((note)=> !(note.title===title))
    if(notes.length===updatedNotes.length){
        console.log(chalk.red.inverse("No note found !!"))
    }
    else{
    saveNotes(updatedNotes)
    console.log(chalk.green.inverse('Note Removed !'))
    }
}

const loadNotes = ()=>{
    try{
    const dataBuffer = fs.readFileSync('notes.json')
    const data= dataBuffer.toString()
    return JSON.parse(data)
    }
    catch(e){
     
        return []
    }
}

const listNotes =()=>{
    console.log(chalk.inverse('Your Notes !!'))
    const notes = loadNotes()
    //notes.forEach((note)=>console.log(note))
    notes.forEach(element => console.log('Title : '+ element.title +' , '+'Body : '+element.body))
}

const readNote = (title) =>{
    const note = loadNotes().find(note => note.title===title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse('No note found!!'))
    }
}


module.exports= {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes: listNotes,
    readNote: readNote

}