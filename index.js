let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Get leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Save current tab
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

// Render leads list
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// Delete all leads on double-click
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// Save input manually
inputBtn.addEventListener("click", function() {
    if (inputEl.value.trim() !== "") {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})
