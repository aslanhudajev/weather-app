function CreateFormSelectElement (name, labelText, classList, id) {
    const inSelDiv = document.createElement("div");
    inSelDiv.classList.add("select-element");
    
    const inSelLabel = document.createElement("label");
    inSelLabel.htmlFor = name;
    inSelLabel.textContent = labelText;
    
    const inSel = document.createElement("select");
    inSel.classList.add(classList);
    inSel.name = name;
    inSel.id = id;

    inSelDiv.appendChild(inSelLabel);
    inSelDiv.appendChild(inSel);

    function AddOption (optionText, optionId) {        
        const optEl = document.createElement("option");
        optEl.textContent = optionText;
        optEl.value = optionId;

        inSel.appendChild(optEl);
    }
    
    return { container: inSelDiv, inputField: inSel, AddOption};
}

export default CreateFormSelectElement