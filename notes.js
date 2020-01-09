const fs = require('fs')
const chalk = require('chalk')


const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( (note) => 
        note.title === title
    )

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('no new note added'))
    }
    
    
}

const removeNote = (title)=>{
    const notes = loadNotes()
    const updateNotes = notes.filter ( note =>
         note.title !== title
    )
    saveNotes(updateNotes)
    if(notes.length === updateNotes.length){
        console.log(chalk.red.inverse("no note removed"))
    } else {
        console.log(chalk.green.inverse("Note removed successfully"))
    }

}

const listNotes = ()=> {
    const notes = loadNotes()

    console.log('your notes')
    notes.forEach( (note) => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find( (note)=> 
        note.title === title
        
    )
    if(findNote){
        console.log(chalk.yellow.bold(findNote.title))
        console.log(findNote.body)
     } else{
         console.log("No note of such title")
     }
}

const saveNotes = (notes) => {
     const dataJSON = JSON.stringify(notes)
     fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e){
        return []
    }
   
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
