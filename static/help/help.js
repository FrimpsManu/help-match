// Copilot, read https://danielongithub17.github.io/funcs.js for more context
const HELP_DATA = JSON.parse(get("HELP_DATA").textContent);
const FIELDS = [["role", ["Helped", "Helper"]], ["specific", []]];
const FIELD_NAMES = ["channel", "role", "specific"];

function main(){
    configureEvents({
        "load": [addChannelData],
        "change": [updateRoleAndSpecific],
        "click": [selectInfoFromDescription],
    });
}

function selectInfoFromDescription(event){
    /* Function to extract the role, channel and specific from the description */
    if (event.target.id != "auto-fill-button") return;
    const description = get("help-description").value.trim();
    const MIN_DESCRIPTION_LENGTH = 10;
    if (!description || description.length <= MIN_DESCRIPTION_LENGTH){
        alert("Please enter a description (more than ten characters) to auto-fill the form.");
        return;
    }
    get("auto-fill-button").disabled = true;
    fetch("ai-select/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value,
        },
        body: JSON.stringify({"help-description": description}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        FIELD_NAMES.forEach(field => get(field).value = data[field]);
    })
    .catch(error=>{
        console.error("Error:", error);
        alert("Error in AI auto-fill. Please fill the form manually.");
    })
    .finally(() => event.target.disabled = false);
}

function updateRoleAndSpecific(event) {
    /* Function to update the role and specific select elements based on the channel selected */
    if (event.target.id != "channel") return;
    const channel = event.target.value;
    FIELDS.forEach(field_default => {
        const [field, default_value] = field_default
        const select = get(field);
        /* Clear the select element */
        select.innerHTML = "";
        HELP_DATA[channel][field] = HELP_DATA[channel][field] || default_value;
        for (const option of HELP_DATA[channel][field]) {
            const optionElement = make("option");
            optionElement.value = option;
            add(optionElement, select).innerText = option;
        }        
    });
    // add an 'other' field for the specific select element
    const specific = get("specific");
    const otherOption = make("option");
    otherOption.value = "Other";
    add(otherOption, specific).innerText = "Other";
}

function addChannelData(event){
    /* Function to add options to the select elements from HELP_DATA json */
    const channelSelect = get("channel");
    for (const channel in HELP_DATA) {
        const channelOption = make("option");
        channelOption.value = channel;
        channelOption.innerText = channel;
        add(channelOption, channelSelect);
    };
    // add role and specific data for the first channel
    updateRoleAndSpecific({target: channelSelect});
};

main();