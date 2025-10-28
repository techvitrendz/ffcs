import React,  {useState, useEffect} from 'react'
import styles from './Input.module.css'

function Input({list, codeSelected, setCodeSelected,placeholder}) {

    const [userInput, setUserInput] = useState('')
    const [dropdown, setDropdown] = useState([])
    const [open, setOpen] = useState(false)
    const [clicked, setClicked] = useState(false)

    const onListClickViewDropdown = (crCodeChosen) =>{
        setUserInput(crCodeChosen.crcode);  
        setCodeSelected(crCodeChosen.crcode); 
        setOpen(false)
        setClicked(true)
    }

    // const onListClickTopTen = (crCodeChosen) =>{
    //     setUserInput(crCodeChosen.coursename);  
        
    //     setOpen(false)
    //     setClicked(true)
    // }

    useEffect(() => {

        // Autocomplete Logic
            if(list && userInput!==""){
                
                const x = list?.filter(crCodeChosen  =>  crCodeChosen.crcode.toUpperCase().includes(userInput.toUpperCase())).slice(0, 8).map((crCodeChosen, i) => {
                return <li onClick={e => onListClickViewDropdown(crCodeChosen)} key={crCodeChosen.id} value={i}>{crCodeChosen.crcode} </li>;
                });

            // Close dropdown on clicking list item
                if(userInput.length !== codeSelected?.length) setOpen(true); setClicked(false)
                if(userInput.length) (clicked) ? setOpen(false) : setOpen(true)
                else setOpen(false);

                setDropdown(x)
            }

            if(userInput===""){
                setOpen(false)
            }
           

    }, [userInput])

    return (
        <div className={styles.component}>
            <div className={styles.inputCover}>
                <input
                type="text"
                onChange={e => {setUserInput(e.target.value)}}
                value={userInput}
                autoComplete="off"
                spellCheck="false"
                />
                <label className={`${styles.inputLabel} ${userInput && styles.valid}`}>{placeholder}</label>
                
            </div>

            <ul id='dropdown' className={open? `${styles.auto_options}` : `${styles.auto_options_none}`} style={{ position: "absolute", zIndex: '10' }}>
                {dropdown}
            </ul>
            
        </div>
    )
}

export default Input
