

function fetchMembers() {

    const URL = "https://myrepos.stackroute.niit.com/api/v4/groups";

    const PRIVATE_TOKEN = prompt("Enter Git Access Token");
    axios.get(`${URL}?per_page=100`, {
        headers: {
            "PRIVATE-TOKEN": PRIVATE_TOKEN
        }
    })
        .then(response => {
            document.getElementById("member-data").style.display = "block";
            document.getElementById("subGroup-data").style.display = "none";
            const userInput = document.getElementById("group-name-input").value.trim();
            const groups = response.data.filter(group => group.full_path == userInput);
            if (groups.length > 0) {
                const groupName = groups[0].full_name;
                const projectURL = `${URL}/${groups[0].id}/members`;
                axios.get(projectURL, {
                    headers: {
                        "PRIVATE-TOKEN": PRIVATE_TOKEN
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        document.getElementById("total-members").innerHTML = `Total Members in the <u>${groupName}</u> group are <u>${response.data.length}</u>`;
                        document.getElementById("member-list").innerHTML = response.data.map(member => `<li>${member.id} - ${member.name} - ${member.username}</li>`).join("");
                    })
            }
            else {
                document.getElementById("total-members").innerHTML = `No Group with the inputted Group Name Exists !!!`;
                document.getElementById("member-list").innerHTML = "";
            }
        })

        .catch(error => {
            console.log(error.data);
        })

}

function fetchSubgroups() {

    const URL = "https://myrepos.stackroute.niit.com/api/v4/groups";
    const PRIVATE_TOKEN = prompt("Enter Git Access Token");

    axios.get(`${URL}?per_page=200`, {
        headers: {
            "PRIVATE-TOKEN": PRIVATE_TOKEN
        }
    })
        .then(response => {
            document.getElementById("member-data").style.display = "none";
            document.getElementById("subGroup-data").style.display = "block";
            const userInput = document.getElementById("group-name-input").value.trim();
            console.log(response.data.filter(group=>group.full_path.startsWith(userInput)));
            if (userInput !== "") {
                const groups = response.data.filter(group =>  group.full_path.startsWith(userInput) && group.full_path !== userInput);
                console.log(response.data)
                if (groups.length > 0) {
                    document.getElementById("total-subGroups").innerHTML = `Total Sub Groups in the <u>${userInput}</u> group are <u>${groups.length}</u>`;
                    document.getElementById("subGroup-list").innerHTML = groups.map(subGroup => `<li>${subGroup.full_path}</li>`).join("");

                }
                else {
                    document.getElementById("total-subGroups").innerHTML = `No Group with the inputted Group Name Exists !!!`;
                    document.getElementById("subGroup-list").innerHTML = "";
                }
            }
            else {
                document.getElementById("total-subGroups").innerHTML = `Please Provide Group Name`;
                document.getElementById("subGroup-list").innerHTML = "";
            }
        })

        .catch(error => {
            console.log(error);
        })

}
